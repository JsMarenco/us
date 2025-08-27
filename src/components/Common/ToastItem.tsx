// Third-party dependencies
import { motion } from "framer-motion";

// Current project dependencies
import cn from "../../utils/cn";

const colors: Record<string, string> = {
  success: "bg-green-500/60",
  error: "bg-red-500/60",
  warn: "bg-yellow-500/60",
  info: "bg-blue-500/60",
};

const ToastItem = ({ message, type }: { message: string; type: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative overflow-hidden rounded-xl border px-4 py-3 shadow-2xl backdrop-blur-md",
        "text-base font-semibold transition-colors",
        "text-gray-900 dark:text-white",
        "border-white/20 dark:border-white/10",
        colors[type],
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl backdrop-blur-md" />

      <div className="relative z-10">{message}</div>
    </motion.div>
  );
};

export default ToastItem;
