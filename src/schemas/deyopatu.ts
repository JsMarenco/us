// Third-party dependencies
import { z } from "zod";

// Current project dependencies

export const DeYoPaTuSchema = z.object({
  id: z.string().min(3, { message: "El ID es requerido" }),

  recipientId: z.string({ error: "El ID del destinatario es obligatorio." }),

  title: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  content: z.string().default(""),
  writtenAt: z.coerce.date({ error: "La fecha de redacción es obligatoria." }),
  spotifyEmbedTrackSrc: z.string().default(""),
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

export const DeYoPaTuDtoSchema = z.object({
  recipientId: z
    .string({ error: "El ID del destinatario es obligatorio." })
    .regex(
      /^[0-9a-fA-F]{24}$/,
      "El ID del destinatario debe ser un ObjectId válido.",
    ),

  spotifyEmbedTrackSrc: z.string().default(""),
  thumbnailSrc: z.string().default(""),

  title: z.string().optional().default(""),
  content: z.string({
    error: "El contenido es obligatorio.",
  }),

  writtenAt: z.coerce.date({
    error: "La fecha de redacción es obligatoria.",
  }),
});

export type DeYoPaTu = z.infer<typeof DeYoPaTuSchema>;
export type DeYoPaTuDto = z.infer<typeof DeYoPaTuDtoSchema>;
