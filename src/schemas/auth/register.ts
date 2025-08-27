// Third-party dependencies
import { z } from "zod";

// Current project dependencies

export const RegisterDtoSchema = z
  .object({
    firstName: z
      .string({ error: "El nombre es obligatorio." })
      .min(2, "El nombre debe tener al menos 2 caracteres."),
    lastName: z
      .string({ error: "El apellido es obligatorio." })
      .min(2, "El apellido debe tener al menos 2 caracteres."),
    email: z
      .string({ error: "El correo electrónico es obligatorio." })
      .email("El correo electrónico no es válido."),
    password: z
      .string({ error: "La contraseña es obligatoria." })
      .min(6, "La contraseña debe tener al menos 6 caracteres."),
    confirmPassword: z
      .string({
        error: "La confirmación de la contraseña es obligatoria.",
      })
      .min(
        6,
        "La confirmación de la contraseña debe tener al menos 6 caracteres.",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
  });

export type RegisterDto = z.infer<typeof RegisterDtoSchema>;
