from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

import os
import shutil

from app.database import get_db
from app.models.upload import Upload
from app.models.invoice import Invoice

from app.services.pdf_service import extract_text_from_pdf
from app.services.batch_service import create_page_batches
from app.services.ai_service import extract_invoices_from_batch

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def parse_amount(value):
    """
    Convert invoice amount to float.

    Examples:
        "5,959.14" -> 5959.14
        "₹12,500.00" -> 12500.0
        1200 -> 1200.0
        None -> 0.0
    """

    if value is None:
        return 0.0

    try:
        if isinstance(value, str):
            value = (
                value.replace(",", "")
                     .replace("₹", "")
                     .strip()
            )

        return float(value)

    except Exception:
        return 0.0


@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    # ----------------------------------------
    # Save uploaded PDF
    # ----------------------------------------

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # ----------------------------------------
    # Extract PDF Text
    # ----------------------------------------

    result = extract_text_from_pdf(file_path)

    if not result["success"]:
        return result

    # ----------------------------------------
    # Create Batches
    # ----------------------------------------

    batches = create_page_batches(result["page_texts"])

    print(f"\nCreated {len(batches)} batch(es)\n")

    all_invoices = []

    # ----------------------------------------
    # Process each batch
    # ----------------------------------------

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

                if "page" not in invoice:
                    invoice["page"] = None

                all_invoices.append(invoice)

    # ----------------------------------------
    # Calculate Total Amount
    # ----------------------------------------

    total_amount = 0.0

    for invoice in all_invoices:
        total_amount += parse_amount(invoice.get("amount"))

    try:

        # ----------------------------------------
        # Save Upload
        # ----------------------------------------

        upload_record = Upload(
            filename=file.filename,
            pages=result["pages"],
            batch_count=len(batches),
            invoice_count=len(all_invoices),
            total_amount=total_amount
        )

        db.add(upload_record)
        db.flush()   # gets upload ID without committing

        # ----------------------------------------
        # Save Invoices
        # ----------------------------------------

        for inv in all_invoices:

            invoice = Invoice(
                upload_id=upload_record.id,
                invoice_number=inv.get("invoice_number"),
                invoice_date=inv.get("invoice_date"),
                dealer=inv.get("dealer"),
                customer=inv.get("customer"),
                amount=parse_amount(inv.get("amount")),
                page=inv.get("page")
            )

            db.add(invoice)

        # ----------------------------------------
        # Commit Transaction
        # ----------------------------------------

        db.commit()

        db.refresh(upload_record)

        print(f"\nSaved Upload ID : {upload_record.id}")
        print(f"Saved {len(all_invoices)} invoices.")
        print(f"Total Amount : {total_amount}")

    except Exception as e:

        db.rollback()

        return {
            "success": False,
            "error": str(e)
        }

    # ----------------------------------------
    # Return Response
    # ----------------------------------------

    return {
        "success": True,
        "upload_id": upload_record.id,
        "filename": file.filename,
        "pages": result["pages"],
        "text_length": result["text_length"],
        "preview": result["preview"],
        "batch_count": len(batches),
        "invoice_count": len(all_invoices),
        "total_amount": total_amount,
        "invoices": all_invoices
    }