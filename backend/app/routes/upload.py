from fastapi import APIRouter, UploadFile, File
import os
import shutil

from app.services.pdf_service import extract_text_from_pdf
from app.services.ai_service import extract_invoice_from_page

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = extract_text_from_pdf(file_path)

    if not result["success"]:
        return result

    all_invoices = []

    for page in result["page_texts"]:

        print(f"Processing Page {page['page']}")

        extracted = extract_invoice_from_page(page["text"])

        if extracted.get("invoices"):

            for invoice in extracted["invoices"]:

                invoice["page"] = page["page"]

                all_invoices.append(invoice)

    return {
        "success": True,
        "filename": file.filename,
        "pages": result["pages"],
        "text_length": result["text_length"],
        "preview": result["preview"],
        "invoice_count": len(all_invoices),
        "invoices": all_invoices
    }