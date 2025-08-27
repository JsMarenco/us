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
        className="w-full rounded-xl border border-gray-200/50 px-6 py-3 text-center font-semibold text-teal-700 transition-colors hover:bg-teal-600 hover:text-white hover:shadow-lg sm:w-auto dark:border-gray-700/50 dark:text-gray-100 dark:hover:bg-teal-600"
      >
        {copied ? "¡Copiado!" : children || "Compartir"}
      </button>
    </>
  );
}
