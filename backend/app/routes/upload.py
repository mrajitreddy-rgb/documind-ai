from fastapi import APIRouter, UploadFile, File
import os
import shutil

from app.services.pdf_service import extract_text_from_pdf
from app.services.batch_service import create_page_batches
from app.services.ai_service import extract_invoices_from_batch

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):

    # Save uploaded file
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text from PDF
    result = extract_text_from_pdf(file_path)

    if not result["success"]:
        return result

    # Create batches (default: 5 pages per batch)
    batches = create_page_batches(result["page_texts"])

    print(f"\nCreated {len(batches)} batch(es)\n")

    all_invoices = []

    # Process each batch
    for index, batch in enumerate(batches, start=1):

        print("=" * 60)
        print(f"Processing Batch {index}")
        print(f"Pages: {batch['pages']}")
        print("=" * 60)

        extracted = extract_invoices_from_batch(batch["text"])

        if extracted.get("success") is False:
            return {
                "success": False,
                "error": extracted.get("error"),
                "invoice_count": 0,
                "invoices": []
            }

        if extracted.get("invoices"):

            for invoice in extracted["invoices"]:

                # Store which pages were processed in this batch
                invoice["pages"] = batch["pages"]

                all_invoices.append(invoice)

    return {
        "success": True,
        "filename": file.filename,
        "pages": result["pages"],
        "text_length": result["text_length"],
        "preview": result["preview"],
        "batch_count": len(batches),
        "invoice_count": len(all_invoices),
        "invoices": all_invoices
    }