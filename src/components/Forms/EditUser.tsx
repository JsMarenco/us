// Third-party dependencies
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import axios from "axios";
import { motion } from "framer-motion";

// Current project dependencies
import { UserEditDtoSchema, type UserEditDto } from "../../schemas/user";
import useAuth from "../../hooks/useAuth";
import useUpload from "../../hooks/useUpload";
import FormContainer from "./Container";

export default function EditUserForm() {
  const { user, loading: userLoading } = useAuth();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    src: avatarSrc,
    handleSelectFile,
    handleUploadFile,
    handleReset,
    loading: uploadingAvatar,
    error,
  } = useUpload();

  const [form, setForm] = useState<UserEditDto>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    avatarSrc: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof UserEditDto, string>>
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

    const parsed = UserEditDtoSchema.safeParse(form);

    if (!parsed.success) {
      const fieldErrors: typeof errors = {};

      parsed.error.issues.forEach((err) => {
        if (err.path[0])
          fieldErrors[err.path[0] as keyof UserEditDto] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put("/api/users/edit", form);

      setServerMessage(response.data.message);
    } catch (err: any) {
      setServerMessage(err.response?.data?.message || "Ocurrió un error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    if (avatarSrc) {
      setForm((prev) => ({
        ...prev,
        avatarSrc,
      }));
    }
  }, [avatarSrc]);

  return (
    <FormContainer title="Editar usuario">
      <form onSubmit={handleSubmit} className="mx-auto w-full space-y-4">
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          accept="image/*"
          onChange={(e) =>
            e.target.files && handleSelectFile(e.target.files[0])
          }
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="relative col-span-full flex items-center justify-center gap-1">
            <img
              src={
                user?.avatarSrc ||
                `https://ui-avatars.com/api/?name=${user?.username}`
              }
              alt="Actual"
              className="h-32 w-32 cursor-pointer rounded-full border-2 border-gray-300"
              onClick={() => fileInputRef.current?.click()}
            />

            <span className="text-7xl font-bold text-gray-500">→</span>

            <img
              src={
                avatarSrc ||
                `https://ui-avatars.com/api/?name=${user?.username}`
              }
              alt="Nueva"
              className="h-32 w-32 rounded-full border-2 border-blue-500"
            />
          </div>

          <button
            className="rounded-xl bg-green-600 px-4 py-2 text-white"
            onClick={handleUploadFile}
            disabled={loading}
          >
            {uploadingAvatar ? "Subiendo..." : "Subir"}
          </button>

          <button
            className="rounded-xl bg-red-500 px-4 py-2 text-white"
            onClick={handleReset}
          >
            Cancelar
          </button>

          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Nombre"
            className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-gray-800 placeholder-gray-500 shadow-md backdrop-blur-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-200/50 dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-green-700/50"
            autoComplete="off"
          />
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Apellido"
            className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-gray-800 placeholder-gray-500 shadow-md backdrop-blur-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-200/50 dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-green-700/50"
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Usuario"
            className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-gray-800 placeholder-gray-500 shadow-md backdrop-blur-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-200/50 dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-green-700/50"
            autoComplete="off"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-gray-800 placeholder-gray-500 shadow-md backdrop-blur-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-200/50 dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-green-700/50"
            autoComplete="off"
          />
        </div>

        <input
          type="password"
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          placeholder="Contraseña actual"
          className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-gray-800 placeholder-gray-500 shadow-md backdrop-blur-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-200/50 dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-green-700/50"
          autoComplete="off"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="Nueva contraseña (opcional)"
            className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-gray-800 placeholder-gray-500 shadow-md backdrop-blur-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-200/50 dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-green-700/50"
            autoComplete="off"
          />
          <input
            type="password"
            name="confirmNewPassword"
            value={form.confirmNewPassword}
            onChange={handleChange}
            placeholder="Confirmar nueva contraseña"
            className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-gray-800 placeholder-gray-500 shadow-md backdrop-blur-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-200/50 dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-green-700/50"
            autoComplete="off"
          />
        </div>

        {(serverMessage || error) && (
          <p className="text-center text-sm text-red-500">{serverMessage}</p>
        )}

        <div className="flex items-center justify-center">
          <motion.button
            type="submit"
            disabled={loading || userLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mx-auto w-[75%] rounded-xl bg-blue-600/80 px-4 py-2 font-semibold text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-blue-700/90 disabled:opacity-50 dark:bg-blue-500/80"
          >
            {loading ? "Guardando..." : "Guardar cambios"}
          </motion.button>
        </div>
      </form>
    </FormContainer>
  );
}
