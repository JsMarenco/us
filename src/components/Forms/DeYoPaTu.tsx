// Third-party dependencies
import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// Current project dependencies
import { DeYoPaTuDtoSchema, type DeYoPaTuDto } from "../../schemas/deyopatu";
import type { User } from "../../schemas/user";

interface DeYoPaTuFormProps {
  users: User[];
}

export default function DeYoPaTuForm({ users }: DeYoPaTuFormProps) {
  const [form, setForm] = useState<DeYoPaTuDto>({
    recipientId: users[0]?.id || "",
    title: "",
    content: "",
    writtenAt: new Date(),
    spotifyEmbedTrackSrc: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof DeYoPaTuDto, string>>
  >({});
  const [serverMessage, setServerMessage] = useState<string | null>("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    let value = e.target.value;

    if (e.target.name === "spotifyEmbedTrackSrc") {
      const match = value.match(/src="([^"]+)"/);

      if (match) {
        value = match[1];
      }
    }

    setForm({ ...form, [e.target.name]: value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerMessage(null);

    const parsed = DeYoPaTuDtoSchema.safeParse(form);

    if (!parsed.success) {
      const fieldErrors: typeof errors = {};

      parsed.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof DeYoPaTuDto] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/deyopatus", form);

      setServerMessage(response.data.message);

      if (response.data.success) {
        setForm({
          recipientId: users[0]?.id || "",
          title: "",
          content: "",
          writtenAt: new Date(),
          spotifyEmbedTrackSrc: "",
        });
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
      className="w-full rounded-xl border border-white/30 bg-white/20 p-6 shadow-xl backdrop-blur-md dark:border-gray-700/50 dark:bg-gray-800/30"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="recipientId"
          value={form.recipientId}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-gray-800 placeholder-gray-500 shadow-md backdrop-blur-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-200/50 dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-green-700/50"
        >
          {users.map((user) => (
            <option
              key={user.id}
              value={user.id}
              className="text-gray-800 dark:text-gray-100"
            >
              {user.username} ({user.email})
            </option>
          ))}
        </select>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Título (opcional)"
          className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-gray-800 placeholder-gray-500 shadow-md backdrop-blur-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-200/50 dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-green-700/50"
        />

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Escribe tus cosas lindas..."
          rows={5}
          className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-gray-800 placeholder-gray-500 shadow-md backdrop-blur-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-200/50 dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-green-700/50"
        />

        <input
          type="text"
          name="spotifyEmbedTrackSrc"
          value={form.spotifyEmbedTrackSrc}
          onChange={handleChange}
          placeholder="Pega aquí el embed de Spotify (iframe o link)"
          className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-gray-800 placeholder-gray-500 shadow-md backdrop-blur-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-200/50 dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-green-700/50"
        />

        {serverMessage && (
          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            {serverMessage}
          </p>
        )}

        <div className="flex justify-center">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-[75%] rounded-xl bg-blue-600/80 px-4 py-2 font-semibold text-white shadow-md backdrop-blur-sm transition hover:bg-blue-700/90 hover:shadow-lg disabled:opacity-50 dark:bg-blue-500/80"
          >
            {loading ? "Enviando..." : "Enviar DeYoPaTu"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
