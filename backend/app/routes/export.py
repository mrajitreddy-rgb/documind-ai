from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Optional

from app.services.excel_service import create_excel

router = APIRouter()


class Invoice(BaseModel):
    invoice_number: str = ""
    invoice_date: str = ""
    dealer: str = ""
    customer: str = ""
    amount: str = ""
    page: Optional[int] = None


class ExportRequest(BaseModel):
    invoices: List[Invoice]


@router.post("/excel")
async def export_excel(request: ExportRequest):
    try:
        filepath = create_excel(
            [invoice.model_dump() for invoice in request.invoices]
        )

        return FileResponse(
            path=filepath,
            filename=filepath.name,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate Excel file: {str(e)}",
        )