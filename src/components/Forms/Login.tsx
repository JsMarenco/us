// Third-party dependencies
import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// Current project dependencies
import { LoginDtoSchema, type LoginDto } from "../../schemas/auth/login";

export default function LoginForm() {
  const [form, setForm] = useState<LoginDto>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginDto, string>>>(
    {},
  );
  const [serverMessage, setServerMessage] = useState<string | null>("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerMessage(null);

    const parsed = LoginDtoSchema.safeParse(form);

    if (!parsed.success) {
      const fieldErrors: typeof errors = {};

      parsed.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof LoginDto] = err.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", form);

      setServerMessage(response.data.message);

      if (response.data.success) {
        window.location.href = "/";
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
        Iniciar sesión
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
          {loading ? "Iniciando..." : "Iniciar sesión"}
        </motion.button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
        ¿No tienes una cuenta?{" "}
        <a href="/auth/register" className="text-blue-600 dark:text-blue-400">
          Regístrate
        </a>
      </p>
    </motion.div>
  );
}
