// Third-party dependencies
import { motion } from "framer-motion";
import { FiLogIn } from "react-icons/fi";

// Current project dependencies
import { defaultAvatar } from "../../../constants";
import type { AxiosError } from "axios";

interface UserMenuWidgetProps {
  user?: {
    username: string;
    firstName: string;
    lastName: string;
    avatarSrc?: string;
  } | null;
  loading?: boolean;
  error?: AxiosError<unknown, any> | null;
}

export default function UserMenuWidget({
  user,
  loading,
  error,
}: UserMenuWidgetProps) {
  if (loading) {
    return (
      <motion.div
        className="flex items-center gap-3 border-b border-gray-200 p-4 dark:border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300 dark:bg-gray-600" />
        <div className="flex flex-col gap-1">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-300 dark:bg-gray-600" />
          <div className="h-3 w-16 animate-pulse rounded bg-gray-300 dark:bg-gray-600" />
        </div>
      </motion.div>
    );
  }

  const shouldLogin = !user || error;

  return (
    <div>
      {shouldLogin ? (
        <motion.a
          href="/auth/login"
          className="flex items-center justify-center gap-3 border-b border-blue-300 px-6 py-3 text-base font-semibold text-blue-800 transition-colors duration-200 hover:text-blue-900 dark:border-blue-600 dark:text-blue-300 dark:hover:text-blue-100"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <FiLogIn className="h-6 w-6" />
          <span>Iniciar sesión</span>
        </motion.a>
      ) : (
        <motion.a
          href={`/u/${user.username}`}
          className="flex items-center gap-3 border-b border-gray-200 px-4 py-3 transition-colors duration-200 dark:border-gray-700"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src={defaultAvatar(user.avatarSrc, user.username)}
            alt={`${user.firstName} ${user.lastName}`}
            className="h-10 w-10 rounded-full border border-gray-200 object-cover dark:border-gray-600"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {user.firstName}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              @{user.username}
            </span>
          </div>
        </motion.a>
      )}
    </div>
  );
}
