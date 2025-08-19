import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// Schemas
import {
  FuturePlanDtoSchema,
  type FuturePlanDto,
  PlanPriorityEnum,
  PlanStatusEnum,
} from "../../schemas/futurePlan";
import { PRIORITY_LABELS, STATUS_LABELS } from "../../constants/enums";

export default function FuturePlanForm() {
  const [form, setForm] = useState<FuturePlanDto>({
    title: "",
    description: "",
    status: "PENDING",
    priority: "HIGH",
    dueDate: undefined,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FuturePlanDto, string>>
  >({});
  const [serverMessage, setServerMessage] = useState<string | null>(null);
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

    setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerMessage(null);

    const parsed = FuturePlanDtoSchema.safeParse(form);

    if (!parsed.success) {
      const fieldErrors: typeof errors = {};

      parsed.error.issues.forEach((err) => {
        if (err.path[0])
          fieldErrors[err.path[0] as keyof FuturePlanDto] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/future-plans", form);

      setServerMessage(response.data.message);
      setForm({
        title: "",
        description: "",
        status: "PENDING",
        priority: "HIGH",
        dueDate: undefined,
      });
    } catch (err: any) {
      setServerMessage(err.response?.data?.message || "Ocurrió un error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full space-y-4 rounded-xl bg-white/30 p-6 shadow-lg backdrop-blur-md dark:bg-gray-900/30"
    >
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Título del plan"
        className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-gray-800 placeholder-gray-500 shadow-md backdrop-blur-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-200/50 dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-green-700/50"
        autoComplete="off"
      />
      {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Descripción del plan"
        className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-gray-800 placeholder-gray-500 shadow-md backdrop-blur-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-200/50 dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-green-700/50"
        rows={5}
      />
      {errors.description && (
        <p className="text-sm text-red-500">{errors.description}</p>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-gray-800 shadow-md backdrop-blur-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-200/50 dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-100 dark:focus:ring-green-700/50"
        >
          {PlanStatusEnum.options.map((s) => (
            <option
              key={s}
              value={s}
              className="text-gray-800 dark:text-gray-100"
            >
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-gray-800 shadow-md backdrop-blur-sm transition-all focus:border-green-400 focus:ring-2 focus:ring-green-200/50 dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-100 dark:focus:ring-green-700/50"
        >
          {PlanPriorityEnum.options.map((p) => (
            <option
              key={p}
              value={p}
              className="text-gray-800 dark:text-gray-100"
            >
              {PRIORITY_LABELS[p]}
            </option>
          ))}
        </select>
      </div>

      {serverMessage && (
        <p className="text-center text-sm text-red-500">{serverMessage}</p>
      )}

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
  );
}
