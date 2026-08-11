import os
import json
import random
import time
import threading
from pathlib import Path

from dotenv import load_dotenv
from google import genai


# -------------------------------------------------------
# Load Environment Variables
# -------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BASE_DIR / ".env")

# -------------------------------------------------------
# Gemini Client
# -------------------------------------------------------

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

# -------------------------------------------------------
# Gemini Resilience / Concurrency Protection
# -------------------------------------------------------
# Default is deliberately conservative: one Gemini request at a time.
# Increase later with GEMINI_MAX_CONCURRENT_REQUESTS=2 if needed.
#
# Retry schedule:
#   attempt 1 -> immediate
#   attempt 2 -> ~3 sec
#   attempt 3 -> ~6 sec
#   attempt 4 -> ~12 sec
#
# A small random jitter prevents several customers from retrying
# at exactly the same moment.
# -------------------------------------------------------

GEMINI_MAX_CONCURRENT_REQUESTS = max(
    1,
    int(os.getenv("GEMINI_MAX_CONCURRENT_REQUESTS", "1"))
)

GEMINI_MAX_ATTEMPTS = max(
    1,
    int(os.getenv("GEMINI_MAX_ATTEMPTS", "4"))
)

GEMINI_INITIAL_RETRY_DELAY = max(
    1.0,
    float(os.getenv("GEMINI_INITIAL_RETRY_DELAY", "3"))
)

GEMINI_MAX_RETRY_DELAY = max(
    GEMINI_INITIAL_RETRY_DELAY,
    float(os.getenv("GEMINI_MAX_RETRY_DELAY", "15"))
)

gemini_semaphore = threading.Semaphore(
    GEMINI_MAX_CONCURRENT_REQUESTS
)


def _is_retryable_gemini_error(error_message: str) -> bool:
    # Return True only for temporary Gemini/API failures.
    message = error_message.lower()

    # 429 may mean RPM/TPM/spend limits.
    # Daily quota cannot be fixed by waiting a few seconds.
    if "429" in message or "resource_exhausted" in message:
        daily_quota_words = (
            "requests per day",
            "daily quota",
            "quota_exceeded",
            "per day",
            "resets at",
        )

        if any(word in message for word in daily_quota_words):
            return False

        return True

    temporary_errors = (
        "503",
        "service unavailable",
        "unavailable",
        "deadline exceeded",
        "timeout",
        "timed out",
        "temporarily unavailable",
    )

    return any(term in message for term in temporary_errors)


def _call_gemini_with_retry(prompt: str, model_name: str):
    # Call Gemini with bounded concurrency and exponential backoff.

    for attempt in range(1, GEMINI_MAX_ATTEMPTS + 1):

        try:
            # Additional customers wait here instead of all hitting
            # Gemini at the same instant.
            with gemini_semaphore:

                print(
                    f"Gemini request "
                    f"{attempt}/{GEMINI_MAX_ATTEMPTS}"
                )

                response = client.models.generate_content(
                    model=model_name,
                    contents=prompt,
                )

            return response

        except Exception as exc:

            error_message = str(exc)

            should_retry = (
                attempt < GEMINI_MAX_ATTEMPTS
                and _is_retryable_gemini_error(error_message)
            )

            if not should_retry:
                raise

            delay = min(
                GEMINI_INITIAL_RETRY_DELAY * (2 ** (attempt - 1)),
                GEMINI_MAX_RETRY_DELAY,
            )

            jitter = random.uniform(
                0,
                min(1.0, delay * 0.25)
            )

            total_delay = delay + jitter

            print(
                f"Temporary Gemini error on attempt "
                f"{attempt}: {error_message}"
            )
            print(
                f"Retrying Gemini in "
                f"{total_delay:.1f} seconds..."
            )

            time.sleep(total_delay)

    raise RuntimeError("Gemini request failed after retries.")

# -------------------------------------------------------
# Invoice Keywords
# -------------------------------------------------------

INVOICE_KEYWORDS = [
    "invoice",
    "invoice no",
    "invoice number",
    "invoice date",
    "amount",
    "dealer",
    "customer",
    "gst",
    "tax",
    "service",
    "repair order",
    "ro number",
    "bill",
    "vehicle"
]


def looks_like_invoice(text: str) -> bool:
    """
    Quick keyword filter to avoid unnecessary Gemini calls.
    """

    text = text.lower()

    for keyword in INVOICE_KEYWORDS:
        if keyword in text:
            return True

    return False


def extract_invoices_from_batch(batch_text: str):
    """
    Extract invoices from a batch of PDF pages.
    """

    if not batch_text.strip():
        print("Skipping empty batch.")

        return {
            "invoices": []
        }

    if not looks_like_invoice(batch_text):
        print("Skipping non-invoice batch.")

        return {
            "invoices": []
        }

    print("Sending batch to Gemini...")

    prompt = f"""
You are an expert AI specialized in extracting invoice information from PDF documents.

The text below comes from multiple PDF pages.

Each page starts with a marker exactly like:

==================== PAGE X ====================

where X is the page number.

A PDF may contain:
- No invoices
- One invoice
- Multiple invoices

Your task is to detect EVERY invoice independently.

For EACH invoice:

1. Identify the invoice number.
2. Identify the invoice date.
3. Identify the dealer/company issuing the invoice.
4. Identify the customer, vehicle owner, or billed party if present.
5. Identify the final invoice amount.
6. Determine the EXACT page number from the nearest PAGE marker.

Return ONLY valid JSON.

If no invoices exist:

{{
  "invoices": []
}}

Otherwise return:

{{
  "invoices": [
    {{
      "invoice_number": "",
      "invoice_date": "",
      "dealer": "",
      "customer": "",
      "amount": "",
      "page": 1
    }}
  ]
}}

Extraction Rules

- invoice_number
  Copy exactly as printed.

- invoice_date
  Copy exactly as printed.

- dealer
  Extract the company or dealer issuing the invoice.

- customer
  Extract the customer name, vehicle owner, or billed party.
  If the customer spans multiple lines, combine them into one string.
  Do NOT copy a customer from another invoice.
  Leave this field empty ONLY if no customer exists for that invoice.

- amount
  Extract the FINAL payable invoice amount.
  Ignore subtotal, GST, tax, discount and intermediate values.

- page
  Return the exact page number where the invoice begins.
  The value MUST be an integer.

General Rules

- Extract EVERY invoice.
- Return JSON only.
- No markdown.
- No explanations.
- Preserve text exactly.
- Ignore duplicate invoices that appear on consecutive pages.
- Never invent information.
- Leave fields empty instead of guessing.

PDF Text:

{batch_text}
"""

    try:

        MODEL_NAME = "gemini-3.5-flash-lite"

        

        response = _call_gemini_with_retry(
            prompt=prompt,
            model_name=MODEL_NAME,
        )

        cleaned = response.text.strip()

        cleaned = (
            cleaned.replace("```json", "")
            .replace("```", "")
            .strip()
        )

        data = json.loads(cleaned)

        if "invoices" not in data:
            data["invoices"] = []

        for invoice in data["invoices"]:
            if "page" not in invoice:
                invoice["page"] = None
        print(f"Found {len(data['invoices'])} invoice(s).")

        return data

    except json.JSONDecodeError:

        print("Invalid JSON returned by Gemini.")
        print(response.text)

        return {
            "invoices": []
        }

    except Exception as e:

        print("Gemini Error:")
        print(e)

        error_message = str(e)

        if "RESOURCE_EXHAUSTED" in error_message or "429" in error_message:
            return {
                "success": False,
                "error": (
                    "AI service is temporarily busy or rate-limited. "
                    "Please wait a moment and try again."
                ),
                "invoices": []
            }

        if (
            "503" in error_message
            or "service unavailable" in error_message.lower()
            or "timeout" in error_message.lower()
        ):
            return {
                "success": False,
                "error": (
                    "AI service is temporarily unavailable. "
                    "Please wait a moment and try again."
                ),
                "invoices": []
            }

        return {
            "success": False,
            "error": error_message,
            "invoices": []
        }