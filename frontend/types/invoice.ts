export interface Invoice {
  invoice_number: string;
  invoice_date: string;
  dealer: string;
  customer: string;
  amount: string;
  page: number | null;
}

export interface UploadResult {
  success: boolean;
  filename: string;
  pages: number;
  text_length: number;
  preview: string;
  batch_count: number;
  invoice_count: number;
  invoices: Invoice[];
}