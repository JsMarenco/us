// Third-party dependencies
import { useState, type ReactNode } from "react";

// Current project dependencies

type Props = {
  url: string;
  children?: ReactNode;
};

export default function ShareButton({ url, children }: Props) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Error al copiar al portapapeles", err);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-400 px-3 py-2 text-sm font-medium text-gray-800 transition-colors hover:border-teal-500 hover:text-teal-600 dark:border-gray-600 dark:text-gray-200 dark:hover:border-teal-400 dark:hover:text-teal-400"
      >
        {copied ? "¡Copiado!" : children || "Compartir"}
      </button>
    </>
  );
}
