from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.upload import Upload
from app.models.invoice import Invoice

router = APIRouter()


@router.get("/uploads")
def get_uploads(db: Session = Depends(get_db)):

    uploads = (
        db.query(Upload)
        .order_by(Upload.created_at.desc())
        .all()
    )

    data = []

    for upload in uploads:

        data.append({
            "id": upload.id,
            "filename": upload.filename,
            "pages": upload.pages,
            "batch_count": upload.batch_count,
            "invoice_count": upload.invoice_count,
            "total_amount": upload.total_amount,
            "created_at": upload.created_at,
        })

    return data


@router.get("/uploads/{upload_id}")
def get_upload(upload_id: int, db: Session = Depends(get_db)):

    upload = (
        db.query(Upload)
        .filter(Upload.id == upload_id)
        .first()
    )

    if upload is None:
        raise HTTPException(
            status_code=404,
            detail="Upload not found"
        )

    invoices = (
        db.query(Invoice)
        .filter(Invoice.upload_id == upload_id)
        .all()
    )

    invoice_data = []

    for invoice in invoices:

        invoice_data.append({
            "id": invoice.id,
            "invoice_number": invoice.invoice_number,
            "invoice_date": invoice.invoice_date,
            "dealer": invoice.dealer,
            "customer": invoice.customer,
            "amount": invoice.amount,
            "page": invoice.page,
        })

    return {
        "upload": {
            "id": upload.id,
            "filename": upload.filename,
            "pages": upload.pages,
            "batch_count": upload.batch_count,
            "invoice_count": upload.invoice_count,
            "total_amount": upload.total_amount,
            "created_at": upload.created_at,
        },
        "invoices": invoice_data,
    }


@router.delete("/uploads/{upload_id}")
def delete_upload(upload_id: int, db: Session = Depends(get_db)):

    upload = (
        db.query(Upload)
        .filter(Upload.id == upload_id)
        .first()
    )

    if upload is None:
        raise HTTPException(
            status_code=404,
            detail="Upload not found"
        )

    db.delete(upload)

    db.commit()

    return {
        "success": True,
        "message": "Upload deleted successfully."
    }