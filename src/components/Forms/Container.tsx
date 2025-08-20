// Third-party dependencies
import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Current project dependencies

interface FormContainerProps {
  children: ReactNode;
  title?: string;
}

export default function FormContainer({ children, title }: FormContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full rounded-xl border border-white/30 bg-white/80 p-6 shadow-xl backdrop-blur-md dark:border-gray-700/50 dark:bg-black/80"
    >
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
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
