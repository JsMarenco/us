// Third-party dependencies
import { useState, useCallback } from "react";
import axios from "axios";

// Current project dependencies

export default function useUpload({
  handleNewNotification,
}: {
  handleNewNotification: ({
    message,
    type,
  }: {
    message: string;
    type: "error" | "success" | "info" | "warning";
  }) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectFile = useCallback((newFile: File) => {
    setFile(newFile);
    setSrc(null);
    setError(null);
  }, []);

  const handleUploadFile = useCallback(async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await axios.post("/api/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      handleNewNotification({
        message: response.data.message,
        type: response.data.success ? "success" : "error",
      });

      setSrc(response.data.data.url || null);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        handleNewNotification({
          message: err.response?.data?.message || err.message,
          type: "error",
        });
      } else if (err instanceof Error) {
        handleNewNotification({
          message: err.message,
          type: "error",
        });
      } else {
        handleNewNotification({
          message: "Error desconocido al subir archivo",
          type: "error",
        });
      }
      setSrc(null);
    } finally {
      setLoading(false);
    }
  }, [file]);

  const handleReset = useCallback(() => {
    setFile(null);
    setSrc(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    file,
    src,
    loading,
    error,
    handleSelectFile,
    handleUploadFile,
    handleReset,
  };
}
