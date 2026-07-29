import fitz  # PyMuPDF


def extract_text_from_pdf(file_path: str):
    """
    Extract text from PDF page by page.
    """

    try:
        doc = fitz.open(file_path)

        page_texts = []
        full_text = ""

        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            text = page.get_text()

            page_texts.append({
                "page": page_num + 1,
                "text": text
            })

            full_text += text + "\n"

        return {
            "success": True,
            "pages": len(doc),
            "text_length": len(full_text),
            "preview": full_text[:1000],
            "page_texts": page_texts
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }