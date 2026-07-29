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
# Keywords used to detect invoice pages
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


def looks_like_invoice(page_text: str) -> bool:
    """
    Quick filter before calling Gemini.
    Saves API calls by skipping irrelevant pages.
    """

    text = page_text.lower()

    for keyword in INVOICE_KEYWORDS:
        if keyword in text:
            return True

    return False


def extract_invoice_from_page(page_text: str):
    """
    Extract invoice information from ONE PDF page.
    """

    # -----------------------------------------
    # Skip empty pages
    # -----------------------------------------

    if not page_text.strip():
        print("Skipping empty page.")

        return {
            "invoices": []
        }

    # -----------------------------------------
    # Skip obvious non-invoice pages
    # -----------------------------------------

    if not looks_like_invoice(page_text):
        print("Skipping non-invoice page.")

        return {
            "invoices": []
        }

    print("Sending page to Gemini...")

    prompt = f"""
You are an expert AI invoice extraction assistant.

The following text is extracted from ONE PAGE of a PDF.

A page may contain:

- No invoice
- One invoice
- Multiple invoices

Extract ALL invoices found.

Return ONLY valid JSON.

If there are no invoices return exactly:

{{
    "invoices":[]
}}

Otherwise return:

{{
    "invoices":[
        {{
            "invoice_number":"",
            "invoice_date":"",
            "dealer":"",
            "customer":"",
            "amount":""
        }}
    ]
}}

Rules:

- No markdown
- No explanation
- No comments
- Preserve values exactly.
- Do not guess missing values.
- Leave unknown fields empty.

Page Text:

{page_text}
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

        print("Gemini returned invalid JSON.")

        print(response.text)

        return {
            "invoices": []
        }

    except Exception as e:

        print("Gemini Error:")
        print(e)

        return {
            "invoices": []
        }