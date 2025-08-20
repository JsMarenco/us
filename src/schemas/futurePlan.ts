// Third-party dependencies
import { z } from "zod";

// Current project dependencies

export const PlanStatusEnum = z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]);
export const PlanPriorityEnum = z.enum(["HIGH", "MEDIUM", "LOW"]);

export const FuturePlanSchema = z.object({
  id: z.string().min(3, { message: "El ID es requerido" }),

  title: z
    .string()
    .min(3, { message: "El título debe tener al menos 3 caracteres" }),

  description: z.string().optional().default(""),

  status: PlanStatusEnum.default("PENDING"),
  priority: PlanPriorityEnum.default("HIGH"),

  dueDate: z.date().optional(),

  proposerId: z
    .string()
    .regex(
      /^[0-9a-fA-F]{24}$/,
      "El ID del proponente debe ser un ObjectId válido.",
    ),
  thumbnailSrc: z.string().default(""),

  createdAt: z
    .string()
    .optional()
    .default(() => new Date().toISOString()),
  updatedAt: z
    .string()
    .optional()
    .default(() => new Date().toISOString()),
});

export const FuturePlanDtoSchema = z.object({
  thumbnailSrc: z.string().default(""),
  title: z
    .string()
    .min(3, { message: "El título debe tener al menos 3 caracteres" }),
  description: z.string().optional().default(""),
  status: PlanStatusEnum.optional().default("PENDING"),
  priority: PlanPriorityEnum.optional().default("HIGH"),
  dueDate: z.date().optional(),
});

export type FuturePlan = z.infer<typeof FuturePlanSchema>;
export type FuturePlanDto = z.infer<typeof FuturePlanDtoSchema>;
