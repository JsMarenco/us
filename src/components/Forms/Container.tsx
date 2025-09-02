// Third-party dependencies
import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Current project dependencies
import cn from "../../utils/cn";

interface FormContainerProps {
  children: ReactNode;
  title?: string;
  containerClassName?: string;
}

export default function FormContainer({
  children,
  title,
  containerClassName,
}: FormContainerProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "w-full rounded-2xl border border-white/30 p-6 shadow-xl backdrop-blur-md dark:border-gray-700/50",
        containerClassName,
      )}
    >
      {title && (
        <motion.h2
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100"
        >
          {title}
        </motion.h2>
      )}

      {children}
    </motion.div>
  );
}
