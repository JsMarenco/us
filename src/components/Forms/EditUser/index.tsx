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
import { UserEditDtoSchema, type UserEditDto } from "../../../schemas/user";
import useAuth from "../../../hooks/useAuth";
import useUpload from "../../../hooks/useUpload";
import FormContainer from "../Container";
import useNotification from "../../../hooks/useNotification";
import getFirstZodErrorMessage from "../../../utils/getFirstZodErrorMessage";
import FormSection from "../FormSection";
import UserProfileHeader from "./UserProfileHeader";
import FileUploadButtons from "./FileUploadButtons";

export default function EditUserForm() {
  const { handleNewNotification, NotificationPortal } = useNotification();

  const { user, loading: userLoading } = useAuth();

  const [form, setForm] = useState<UserEditDto>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    avatarSrc: user?.avatarSrc || "",
    bannerSrc: user?.bannerSrc || "",
    bio: user?.bio || null,
  });

  const [loading, setLoading] = useState(false);

  const normalizeUsername = (u: string) => u.replace(/[^a-zA-Z0-9._-]/g, "_");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "username"
          ? normalizeUsername(e.target.value)
          : e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const parsed = UserEditDtoSchema.safeParse(form);

    if (!parsed.success) {
      handleNewNotification({
        message: getFirstZodErrorMessage(parsed.error),
        type: "error",
      });

      return;
    }

    try {
      setLoading(true);
      const response = await axios.put("/api/users/edit", form);

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

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || "",
        avatarSrc: user.avatarSrc || "",
        bannerSrc: user.bannerSrc || "",
      }));
    }
  }, [user]);

  return (
    <>
      <NotificationPortal />

      <FormContainer title="Editar usuario">
        <form onSubmit={handleSubmit} className="mx-auto w-full space-y-4">
          <FormSection subtitle="Avatar y banner">
            <UserProfileHeader
              user={{
                username: form.username || "",
                firstName: form.firstName || "",
                lastName: form.lastName || "",
                bio: form.bio,
                avatarSrc: form.avatarSrc,
                bannerSrc: form.bannerSrc,
              }}
            >
              <div className="my-4 flex w-full flex-col items-center justify-center space-y-2">
                <FileUploadButtons
                  handleNewNotification={handleNewNotification}
                  userFileSrc={user?.avatarSrc || null}
                  label="avatar"
                  onFileUpload={(src) =>
                    setForm((prev) => ({ ...prev, avatarSrc: src }))
                  }
                />

                <FileUploadButtons
                  handleNewNotification={handleNewNotification}
                  userFileSrc={user?.bannerSrc || null}
                  label="banner"
                  onFileUpload={(src) =>
                    setForm((prev) => ({ ...prev, bannerSrc: src }))
                  }
                />
              </div>
            </UserProfileHeader>
          </FormSection>

          <FormSection subtitle="Detalles del perfil">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

            <div className="space-y-2">
              <textarea
                name="bio"
                value={form.bio || ""}
                placeholder="Escribe tus cosas lindas..."
                rows={12}
                onChange={handleChange}
                className="col-span-full w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-gray-800 placeholder-gray-500 shadow-md backdrop-blur-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-200/50 dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-green-700/50"
              />

              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                {`Máximo 300 caracteres. (${form.bio?.length || 0}/300)`}
              </p>
            </div>
          </FormSection>

          <FormSection subtitle="Cambiar contraseña">
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
          </FormSection>

          <div className="pt-2">
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              placeholder="Contraseña actual"
              className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-gray-800 placeholder-gray-500 shadow-md backdrop-blur-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-200/50 dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-green-700/50"
              autoComplete="off"
            />

            <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              Necesario para guardar los cambios.
            </p>
          </div>

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
    </>
  );
}
