export interface UploadHistoryItem {
  id: number;
  filename: string;
  pages: number;
  batch_count: number;
  invoice_count: number;
  total_amount: number;
  created_at: string;
}

export interface UploadHistoryResponse {
  upload: UploadHistoryItem;
  invoices: Invoice[];
}

export interface Invoice {
  invoice_number: string;
  invoice_date: string;
  dealer: string;
  customer: string;
  amount: string;
  page: number | null;
}