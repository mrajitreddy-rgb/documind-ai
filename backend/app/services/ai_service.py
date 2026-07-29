import os
import json
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

        response = client.models.generate_content(
            model="gemini-flash-latest",
            contents=prompt,
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
                "error": "Gemini API quota exceeded. Please try again later.",
                "invoices": []
            }

        return {
            "success": False,
            "error": error_message,
            "invoices": []
        }