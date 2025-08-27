// Third-party dependencies
import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// Current project dependencies
import {
  RequestPasswordResetDtoSchema,
  type RequestPasswordResetDto,
} from "../../schemas/auth/password";
import useNotification from "../../hooks/useNotification";
import getFirstZodErrorMessage from "../../utils/getFirstZodErrorMessage";

export default function RequestPasswordResetForm() {
  const { handleNewNotification, NotificationPortal } = useNotification();

  const [form, setForm] = useState<RequestPasswordResetDto>({ email: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const parsed = RequestPasswordResetDtoSchema.safeParse(form);

    if (!parsed.success) {
      handleNewNotification({
        message: getFirstZodErrorMessage(parsed.error),
        type: "error",
      });

      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "/api/auth/request-password-reset",
        form,
      );

      handleNewNotification({
        message: response.data.message,
        type: response.data.success ? "success" : "error",
      });
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
          Recuperar contraseña
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            className="w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
            autoComplete="off"
          />

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar enlace de recuperación"}
          </motion.button>
        </form>

        <p className="mt-4 space-x-2 text-center text-sm text-gray-700 dark:text-gray-300">
          <span>¿Recordaste tu contraseña?</span>
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
