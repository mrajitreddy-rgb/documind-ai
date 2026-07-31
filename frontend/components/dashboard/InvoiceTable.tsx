interface Invoice {
  invoice_number: string;
  invoice_date: string;
  dealer: string;
  customer: string;
  amount: string;
  page: number | null;
}


interface InvoiceTableProps {
  invoices: Invoice[];
  invoiceCount: number;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  exporting: boolean;
  loading: boolean;
  onExcelExport: () => void;
  onCsvExport: () => void;
}