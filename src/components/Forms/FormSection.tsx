// Third-party dependencies
import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Current project dependencies

interface FormSectionProps {
  children: ReactNode;
  subtitle?: string;
}

export default function FormSection({ children, subtitle }: FormSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6 rounded-xl border border-white/20 p-4 shadow-md backdrop-blur-sm dark:border-gray-700/40"
    >
      {subtitle && (
        <motion.h3
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-3 text-lg font-medium text-gray-700 dark:text-gray-200"
        >
          {subtitle}
        </motion.h3>
      )}

      <div className="space-y-4">{children}</div>
    </motion.section>
  );
}
