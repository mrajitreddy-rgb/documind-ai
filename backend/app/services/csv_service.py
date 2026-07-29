from pathlib import Path
from datetime import datetime
import csv


EXPORT_FOLDER = Path("exports/csv")
EXPORT_FOLDER.mkdir(parents=True, exist_ok=True)


def create_csv(invoices):
    """
    Create a CSV file from extracted invoices.

    Returns:
        Path to the generated CSV file.
    """

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    filename = f"DocuMind_Invoices_{timestamp}.csv"

    filepath = EXPORT_FOLDER / filename

    headers = [
        "Invoice Number",
        "Invoice Date",
        "Dealer",
        "Customer",
        "Amount",
        "Page",
    ]

    with open(filepath, "w", newline="", encoding="utf-8-sig") as csvfile:

        writer = csv.writer(csvfile)

        writer.writerow(headers)

        for invoice in invoices:

            writer.writerow([
                invoice.get("invoice_number", ""),
                invoice.get("invoice_date", ""),
                invoice.get("dealer", ""),
                invoice.get("customer", ""),
                invoice.get("amount", ""),
                invoice.get("page", ""),
            ])

    return filepath