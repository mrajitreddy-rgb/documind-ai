from fastapi import APIRouter, UploadFile, File
import os
import shutil
import fitz  # PyMuPDF

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Open the PDF
    doc = fitz.open(file_path)

    if doc.needs_pass:
        doc.close()
        return {
            "success": False,
            "message": "This PDF is password-protected. Please upload an unlocked PDF."
        }

    page_count = doc.page_count
    extracted_text = ""

    for page_num in range(page_count):
        page = doc.load_page(page_num)
        extracted_text += page.get_text()

    doc.close()
    return {
        "success": True,
        "filename": file.filename,
        "pages": page_count,
        "text_length": len(extracted_text),
        "preview": extracted_text[:500]
    }