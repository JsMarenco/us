// Third-party dependencies
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Current project dependencies
import cn from "../../utils/cn";

interface BackgroundPortalProps {
  src: string;
  hover: boolean;
}

export default function BackgroundPortal({
  src,
  hover,
}: BackgroundPortalProps) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const div = document.createElement("div");

    document.body.appendChild(div);
    setContainer(div);
    return () => {
      document.body.removeChild(div);
    };
  }, []);

  if (!container) return null;

  return createPortal(
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hover ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed inset-0 -z-20 h-full w-full blur-xl"
        style={{
          backgroundImage: `url('${src}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hover ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed inset-0 -z-10 h-full w-full bg-white/10 dark:bg-black/70"
      />
    </>,
    container,
  );
}
