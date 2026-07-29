from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Optional

from app.services.excel_service import create_excel
from app.services.csv_service import create_csv

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


@router.post("/csv")
async def export_csv(request: ExportRequest):
    try:
        filepath = create_csv(
            [invoice.model_dump() for invoice in request.invoices]
        )

        return FileResponse(
            path=filepath,
            filename=filepath.name,
            media_type="text/csv",
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate CSV file: {str(e)}",
        )