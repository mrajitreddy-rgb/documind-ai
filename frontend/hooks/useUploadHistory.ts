"use client";

import { useCallback, useEffect, useState } from "react";

import {
  deleteUpload,
  getUploads,
} from "@/services/api";

import { UploadHistoryItem } from "@/types/history";

export function useUploadHistory() {
  const [uploads, setUploads] = useState<
    UploadHistoryItem[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadUploads = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getUploads();

      setUploads(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to load uploads.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUploads();
  }, [loadUploads]);

  const removeUpload = async (id: number) => {
    await deleteUpload(id);

    setUploads((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  return {
    uploads,
    loading,
    error,
    reload: loadUploads,
    removeUpload,
  };
}