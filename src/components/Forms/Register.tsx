// Third-party dependencies
import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// Current project dependencies
import {
  RegisterDtoSchema,
  type RegisterDto,
} from "../../schemas/auth/register";

export default function RegisterForm() {
  const [form, setForm] = useState<RegisterDto>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterDto, string>>
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

    // Validación con Zod
    const parsed = RegisterDtoSchema.safeParse(form);

    if (!parsed.success) {
      const fieldErrors: typeof errors = {};

      parsed.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof RegisterDto] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/auth/register", form);

      setServerMessage(response.data.message);

      if (response.data.success) {
        window.location.href = "/auth/login";
      }
    } catch (err: any) {
      setServerMessage(err.response?.data?.message || "Ocurrió un error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-md rounded-xl bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:bg-gray-800/90"
    >
      <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
        Registrarse
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
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Contraseña"
          className="w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          autoComplete="off"
        />
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirmar contraseña"
          className="w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          autoComplete="off"
        />

        {serverMessage && (
          <p className="text-center text-sm text-red-500">{serverMessage}</p>
        )}

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </motion.button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
        ¿Ya tienes una cuenta?{" "}
        <a href="/auth/login" className="text-blue-600 dark:text-blue-400">
          Inicia sesión
        </a>
      </p>
    </motion.div>
  );
}
