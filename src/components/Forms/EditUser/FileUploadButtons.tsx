// Third-party dependencies
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AiOutlineUpload,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";

// Current project dependencies
import useUpload from "../../../hooks/useUpload";

interface FileUploadButtonsProps {
  label: string;
  handleNewNotification: ({
    message,
    type,
  }: {
    message: string;
    type: "error" | "success" | "info" | "warning";
  }) => void;
  onFileUpload?: (url: string) => void;
  userFileSrc?: string | null;
}

export default function FileUploadButtons({
  label,
  handleNewNotification,
  onFileUpload,
  userFileSrc,
}: FileUploadButtonsProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    src,
    handleSelectFile,
    handleUploadFile,
    handleReset,
    loading,
    file,
  } = useUpload({ handleNewNotification });

  useEffect(() => {
    if (src && onFileUpload) {
      onFileUpload(src);
    }
  }, [src, onFileUpload]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex space-x-2"
    >
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="flex items-center space-x-1 rounded-xl bg-white/20 px-4 py-2 font-semibold text-gray-800 shadow-md backdrop-blur-sm transition-colors hover:bg-green-400/20 disabled:opacity-50 dark:bg-gray-800/30 dark:text-gray-100"
      >
        <AiOutlineEdit />
        <span>{loading ? "Cargando..." : `Cambiar ${label}`}</span>
      </button>

      {(src || userFileSrc) && (
        <button
          type="button"
          onClick={() => {
            handleReset();
            onFileUpload?.("");
          }}
          disabled={loading}
          className="flex items-center space-x-1 rounded-xl bg-white/20 px-4 py-2 font-semibold text-gray-800 shadow-md backdrop-blur-sm transition-colors hover:bg-red-400/20 disabled:opacity-50 dark:bg-gray-800/30 dark:text-gray-100"
        >
          <AiOutlineDelete />
          <span>Quitar {label}</span>
        </button>
      )}

      {file && (
        <button
          type="button"
          onClick={handleUploadFile}
          disabled={loading}
          className="flex items-center space-x-1 rounded-xl bg-white/20 px-4 py-2 font-semibold text-gray-800 shadow-md backdrop-blur-sm transition-colors hover:bg-blue-400/20 disabled:opacity-50 dark:bg-gray-800/30 dark:text-gray-100"
        >
          <AiOutlineUpload />
          <span>Subir {label}</span>
        </button>
      )}

      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={(e) => e.target.files && handleSelectFile(e.target.files[0])}
      />
    </motion.div>
  );
}
