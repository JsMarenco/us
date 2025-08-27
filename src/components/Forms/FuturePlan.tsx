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
import {
  FuturePlanDtoSchema,
  type FuturePlanDto,
  PlanPriorityEnum,
  PlanStatusEnum,
} from "../../schemas/futurePlan";
import { PRIORITY_LABELS, STATUS_LABELS } from "../../constants/enums";
import FormContainer from "./Container";
import useUpload from "../../hooks/useUpload";
import BackgroundPortal from "../Common/BackgroundPortal";
import Select from "../Common/Select";
import useNotification from "../../hooks/useNotification";
import getFirstZodErrorMessage from "../../utils/getFirstZodErrorMessage";

export default function FuturePlanForm() {
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

  const [form, setForm] = useState<FuturePlanDto>({
    title: "",
    description: "",
    status: "PENDING",
    priority: "HIGH",
    dueDate: undefined,
    thumbnailSrc: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "dueDate") {
      setForm({ ...form, dueDate: value ? new Date(value) : undefined });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const parsed = FuturePlanDtoSchema.safeParse(form);

    if (!parsed.success) {
      handleNewNotification({
        message: getFirstZodErrorMessage(parsed.error),
        type: "error",
      });

      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/future-plans", form);

      handleNewNotification({
        message: response.data.message,
        type: response.data.success ? "success" : "error",
      });
      setForm({
        title: "",
        description: "",
        status: "PENDING",
        priority: "HIGH",
        dueDate: undefined,
        thumbnailSrc: "",
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
    if (thumbnailSrc) {
      setForm((prev) => ({
        ...prev,
        thumbnailSrc,
      }));
    }
  }, [thumbnailSrc]);

  const handleStatusChange = (status: any) => {
    setForm((prev) => ({
      ...prev,
      status,
    }));
  };

  const handlePriorityChange = (priority: any) => {
    setForm((prev) => ({
      ...prev,
      priority,
    }));
  };

  const statusItems = PlanStatusEnum.options.map((s) => ({
    value: s,
    label: STATUS_LABELS[s],
  }));

  const priorityItems = PlanPriorityEnum.options.map((p) => ({
    value: p,
    label: PRIORITY_LABELS[p],
  }));

  return (
    <>
      <NotificationPortal />

      <FormContainer title="Crear plan">
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

          <div className="col-span-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-full flex items-center justify-center">
              <div className="relative flex max-h-72 min-h-52 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-gray-300 bg-white/20 shadow-md transition-all dark:border-gray-600 dark:bg-gray-800/40 dark:shadow-black/50">
                {file ? (
                  <>
                    <img
                      src={thumbnailSrc || URL.createObjectURL(file)}
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

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Título del plan"
            className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-gray-800 placeholder-gray-500 shadow-md backdrop-blur-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-200/50 dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-green-700/50"
            autoComplete="off"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descripción del plan"
            className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-gray-800 placeholder-gray-500 shadow-md backdrop-blur-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-200/50 dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-green-700/50"
            rows={5}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Select
              value={form.status}
              onChange={handleStatusChange}
              items={statusItems}
            />

            <Select
              value={form.priority}
              onChange={handlePriorityChange}
              items={priorityItems}
            />
          </div>

          <div className="flex justify-center">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-[75%] rounded-xl bg-blue-600/80 px-4 py-2 font-semibold text-white shadow-md backdrop-blur-sm transition hover:bg-blue-700/90 hover:shadow-lg disabled:opacity-50 dark:bg-blue-500/80"
            >
              {loading ? "Enviando..." : "Enviar"}
            </motion.button>
          </div>
        </form>
      </FormContainer>
    </>
  );
}
