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
You are an expert invoice extraction AI.

The following text comes from MULTIPLE PDF PAGES.

Each page begins with:

==================== PAGE X ====================

There may be:
- No invoices
- One invoice
- Multiple invoices

Extract EVERY invoice you can find.

Return ONLY valid JSON.

If no invoices exist:

{{
  "invoices": []
}}

Otherwise:

{{
  "invoices": [
    {{
      "invoice_number": "",
      "invoice_date": "",
      "dealer": "",
      "customer": "",
      "amount": ""
    }}
  ]
}}

Rules:
- Return JSON only.
- No markdown.
- No explanations.
- Preserve values exactly.
- Leave unknown values empty.
- Ignore duplicate invoices if they appear on consecutive pages.

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