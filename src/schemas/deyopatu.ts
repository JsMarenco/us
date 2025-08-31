// Third-party dependencies
import { z } from "zod";

// Current project dependencies

export const DeYoPaTuSchema = z.object({
  id: z.string().min(3, { message: "El ID es requerido" }),

  title: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  content: z.string().default(""),
  writtenAt: z.coerce.date({ error: "La fecha de redacción es obligatoria." }),
  thumbnailSrc: z.string().default(""),
  spotifyEmbedTrackSrc: z
    .string()
    .default("")
    .refine(
      (val) =>
        val === "" ||
        /^https?:\/\/open\.spotify\.com\/(embed\/)?(track|playlist|album)\/[a-zA-Z0-9]+(\?[a-zA-Z0-9=&_-]+)?/.test(
          val,
        ),
      {
        message: "Debe ser una URL de Spotify válida o vacío",
      },
    ),

  isAnonymous: z
    .boolean({
      error: "El estado de anonimato es obligatorio.",
    })
    .default(false),

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
  id: z.string().optional().default(""),

  spotifyEmbedTrackSrc: z
    .string()
    .default("")
    .refine(
      (val) =>
        val === "" ||
        /^https?:\/\/open\.spotify\.com\/(embed\/)?(track|playlist|album)\/[a-zA-Z0-9]+(\?[a-zA-Z0-9=&_-]+)?/.test(
          val,
        ),
      {
        message: "Debe ser una URL de Spotify válida o vacío",
      },
    ),
  thumbnailSrc: z.string().default(""),
  isAnonymous: z
    .boolean({
      error: "El estado de anonimato es obligatorio.",
    })
    .default(false),
  title: z.string().optional().default(""),
  content: z
    .string({
      error: "El contenido es obligatorio.",
    })
    .min(3, { message: "El contenido debe tener al menos 3 caracteres" }),

  writtenAt: z.coerce.date({
    error: "La fecha de redacción es obligatoria.",
  }),
});

export type DeYoPaTu = z.infer<typeof DeYoPaTuSchema>;
export type DeYoPaTuDto = z.infer<typeof DeYoPaTuDtoSchema>;
