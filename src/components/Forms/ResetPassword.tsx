// Third-party dependencies
import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// Current project dependencies
import {
  ResetPasswordDtoSchema,
  type ResetPasswordDto,
} from "../../schemas/auth/password";
import useNotification from "../../hooks/useNotification";
import getFirstZodErrorMessage from "../../utils/getFirstZodErrorMessage";

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const { handleNewNotification, NotificationPortal } = useNotification();

  const [form, setForm] = useState<ResetPasswordDto>({
    token,
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ResetPasswordDto, string>>
  >({});
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerMessage(null);

    const parsed = ResetPasswordDtoSchema.safeParse(form);

    if (!parsed.success) {
      handleNewNotification({
        message: getFirstZodErrorMessage(parsed.error),
        type: "error",
      });

      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/auth/reset-password", form);

      handleNewNotification({
        message: response.data.message,
        type: response.data.success ? "success" : "error",
      });

      if (response.data.success) {
        window.location.href = "/auth/login";
      }
    } catch (err: any) {
      handleNewNotification({
        message: err.response?.data?.message || "Ocurrió un error.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NotificationPortal />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-md rounded-xl bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:bg-gray-800/90"
      >
        <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
          Restablecer contraseña
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Nueva contraseña"
            className="w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirmar contraseña"
            className="w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />

          {serverMessage && (
            <p className="text-center text-sm text-gray-500 dark:text-gray-300">
              {serverMessage}
            </p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Restableciendo..." : "Restablecer contraseña"}
          </motion.button>
        </form>

        <p className="mt-4 space-x-2 text-center text-sm text-gray-700 dark:text-gray-300">
          <span>¿Ya tienes una cuenta?</span>
          <a
            href="/auth/login"
            className="ml-1 text-blue-600 underline transition-colors duration-200 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Inicia sesión
          </a>
        </p>
      </motion.div>
    </>
  );
}
