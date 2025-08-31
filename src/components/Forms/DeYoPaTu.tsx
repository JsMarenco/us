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
import { DeYoPaTuDtoSchema, type DeYoPaTuDto } from "../../schemas/deyopatu";
import useUpload from "../../hooks/useUpload";
import FormContainer from "./Container";
import useNotification from "../../hooks/useNotification";
import getFirstZodErrorMessage from "../../utils/getFirstZodErrorMessage";
import Select from "../Common/Select";

export default function DeYoPaTuForm({ deyopatu }: { deyopatu?: DeYoPaTuDto }) {
  const { handleNewNotification, NotificationPortal } = useNotification();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    src: thumbnailSrc,
    handleSelectFile,
    handleUploadFile,
    handleReset,
    loading: uploadingThumbnail,
    file,
  } = useUpload({ handleNewNotification });

  const [form, setForm] = useState<DeYoPaTuDto>({
    id: deyopatu?.id || "",
    title: deyopatu?.title || "",
    content: deyopatu?.content || "",
    writtenAt: new Date(),
    spotifyEmbedTrackSrc: deyopatu?.spotifyEmbedTrackSrc || "",
    thumbnailSrc: deyopatu?.thumbnailSrc || "",
    isAnonymous: deyopatu?.isAnonymous || false,
  });

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
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const parsed = DeYoPaTuDtoSchema.safeParse(form);

    if (!parsed.success) {
      handleNewNotification({
        message: getFirstZodErrorMessage(parsed.error),
        type: "error",
      });

      return;
    }

    try {
      setLoading(true);

      let response;

      if (form.id) {
        response = await axios.put("/api/de-yo-pa-tus", form);
      } else {
        response = await axios.post("/api/de-yo-pa-tus", form);
      }

      handleNewNotification({
        message: response.data.message,
        type: response.data.success ? "success" : "error",
      });

      if (response.data.success && response.data.data.previewLink) {
        window.location.href = response.data.data.previewLink;
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

  useEffect(() => {
    if (thumbnailSrc) {
      setForm((prev) => ({
        ...prev,
        thumbnailSrc,
      }));
    }
  }, [thumbnailSrc]);

  const anonymityItems = [
    { value: "false", label: "No anónimo" },
    { value: "true", label: "Anónimo" },
  ];

  return (
    <>
      <NotificationPortal />

      <FormContainer
        title={deyopatu ? "Editar de-yo-pa-tu " : "Crear un de-yo-pa-tu"}
      >
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            accept="image/*"
            onChange={(e) =>
              e.target.files && handleSelectFile(e.target.files[0])
            }
          />

          <div className="col-span-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-full flex items-center justify-center">
              <div className="relative flex max-h-72 min-h-52 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-gray-300 bg-white/20 shadow-md transition-all dark:border-gray-600 dark:bg-gray-800/40 dark:shadow-black/50">
                {file || form.thumbnailSrc ? (
                  <>
                    <img
                      src={
                        thumbnailSrc ||
                        form.thumbnailSrc ||
                        (file ? URL.createObjectURL(file) : "")
                      }
                      alt="Previsualización"
                      className="h-full w-full object-cover transition-all"
                    />

                    {!thumbnailSrc && (
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white dark:text-gray-900">
                        Imagen seleccionada (aún no subida)
                      </div>
                    )}
                  </>
                ) : (
                  <div className="mx-5 flex h-11 max-w-xs items-center justify-center text-sm font-medium text-gray-500 dark:text-gray-400">
                    <span>No hay imagen</span>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-xl bg-white/20 px-4 py-2 text-gray-800 placeholder-gray-500 shadow-md backdrop-blur-sm transition-all hover:bg-white/30 focus:ring-2 focus:ring-green-200/50 dark:bg-gray-800/30 dark:text-gray-100 dark:hover:bg-gray-800/50 dark:focus:ring-green-700/50"
            >
              {file ? "Imagen cargada" : "Seleccionar imagen"}
            </button>

            <button
              className="rounded-xl bg-white/20 px-4 py-2 text-gray-800 placeholder-gray-500 shadow-md backdrop-blur-sm transition-all hover:bg-white/30 focus:ring-2 focus:ring-green-200/50 disabled:opacity-50 dark:bg-gray-800/30 dark:text-gray-100 dark:hover:bg-gray-800/50 dark:focus:ring-green-700/50"
              onClick={handleUploadFile}
              disabled={uploadingThumbnail}
            >
              {uploadingThumbnail ? "Subiendo..." : "Subir"}
            </button>

            <button
              className="rounded-xl bg-white/20 px-4 py-2 text-gray-800 placeholder-gray-500 shadow-md backdrop-blur-sm transition-all hover:bg-white/30 focus:ring-2 focus:ring-green-200/50 dark:bg-gray-800/30 dark:text-gray-100 dark:hover:bg-gray-800/50 dark:focus:ring-green-700/50"
              onClick={handleReset}
            >
              Cancelar
            </button>
          </div>

          <div className="col-span-full grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Título (opcional)"
              className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-gray-800 placeholder-gray-500 shadow-md backdrop-blur-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-200/50 dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-green-700/50"
            />

            <Select
              items={anonymityItems}
              value={String(form.isAnonymous)}
              onChange={(e) =>
                setForm({
                  ...form,
                  isAnonymous: e === "true",
                })
              }
            />
          </div>

          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Escribe tus cosas lindas..."
            rows={15}
            className="col-span-full w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-gray-800 placeholder-gray-500 shadow-md backdrop-blur-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-200/50 dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-green-700/50"
          />

          <input
            type="text"
            name="spotifyEmbedTrackSrc"
            value={form.spotifyEmbedTrackSrc}
            onChange={handleChange}
            placeholder="Pega aquí el embed de Spotify (iframe o link)"
            className="col-span-full w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-gray-800 placeholder-gray-500 shadow-md backdrop-blur-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-200/50 dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-green-700/50"
            autoComplete="off"
          />

          <div className="col-span-full flex justify-center">
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
      </FormContainer>
    </>
  );
}
