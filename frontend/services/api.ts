const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:8000";

export async function uploadPdf(formData: FormData) {
  const response = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed.");
  }

  return response.json();
}

export async function getUploads() {
  const response = await fetch(`${API_URL}/api/uploads`);

  if (!response.ok) {
    throw new Error("Unable to fetch uploads.");
  }

  return response.json();
}

export async function getUpload(id: number) {
  const response = await fetch(
    `${API_URL}/api/uploads/${id}`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch upload.");
  }

  return response.json();
}

export async function deleteUpload(id: number) {
  const response = await fetch(
    `${API_URL}/api/uploads/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Delete failed.");
  }

  return response.json();
}