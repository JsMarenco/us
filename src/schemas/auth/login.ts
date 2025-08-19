// Third-party dependencies
import { z } from "zod";

// Current project dependencies

export const LoginDtoSchema = z.object({
  email: z
    .string({ error: "El correo electrónico es obligatorio." })
    .email("El correo electrónico no es válido."),
  password: z
    .string({ error: "La contraseña es obligatoria." })
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
});

export type LoginDto = z.infer<typeof LoginDtoSchema>;
