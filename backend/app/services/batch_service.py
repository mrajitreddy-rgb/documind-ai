from typing import List, Dict


def create_page_batches(
    page_texts: List[Dict],
    batch_size: int = 5
):
    """
    Split extracted PDF pages into batches.

    Example:

    Page 1
    Page 2
    Page 3
    Page 4
    Page 5

        ↓

    Batch 1

    -----------------------

    Page 6
    Page 7
    Page 8
    Page 9
    Page 10

        ↓

    Batch 2
    """

    batches = []

    for i in range(0, len(page_texts), batch_size):

        batch_pages = page_texts[i:i + batch_size]

        page_numbers = [
            page["page"]
            for page in batch_pages
        ]

        batch_text = ""

        for page in batch_pages:

            batch_text += (
                f"\n\n"
                f"========== PAGE {page['page']} ==========\n\n"
            )

            batch_text += page["text"]

        batches.append(
            {
                "pages": page_numbers,
                "text": batch_text
            }
        )

    return batches