// Third-party dependencies
import { v4 as uuidv4 } from "uuid";
import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

// Current project dependencies
import ToastItem from "../components/Common/ToastItem";

type Notification = {
  id: number;
  message: string;
  type: "success" | "error" | "info" | "warning";
};

let idCounter = 0;

const useNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);

    const el = document.getElementById("notifications");

    if (el) {
      setContainer(el);
    }
  }, []);

  const handleNewNotification = useCallback(
    ({ message, type }: { message: string; type: Notification["type"] }) => {
      if (!message) return;

      const newNotification = {
        id: ++idCounter,
        message,
        type,
      };

      setNotifications((prev) => [...prev, newNotification]);

      setTimeout(() => {
        setNotifications((prev) =>
          prev.filter((n) => n.id !== newNotification.id),
        );
      }, 4000);
    },
    [],
  );

  const NotificationPortal = () => {
    if (!mounted || !container) return null;

    return createPortal(
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                x: 50,
                scale: 0.8,
                transition: { duration: 0.3, ease: "easeIn" },
              }}
              transition={{ duration: 0.2 }}
            >
              <ToastItem message={n.message} type={n.type} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>,
      container,
    );
  };

  return {
    handleNewNotification,
    NotificationPortal,
  };
};

export default useNotification;
