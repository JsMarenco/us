// Third-party dependencies
import { z } from "zod";

// Current project dependencies

export const RequestPasswordResetDtoSchema = z.object({
  email: z
    .string({ error: "El correo electrónico es obligatorio." })
    .email("El correo electrónico no es válido."),
});

export const ResetPasswordDtoSchema = z
  .object({
    token: z.string({ error: "El token es obligatorio." }),
    password: z
      .string({ error: "La nueva contraseña es obligatoria." })
      .min(6, "La contraseña debe tener al menos 6 caracteres."),
    confirmPassword: z
      .string({ error: "Debes confirmar la contraseña." })
      .min(6, "La confirmación debe tener al menos 6 caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export type ResetPasswordDto = z.infer<typeof ResetPasswordDtoSchema>;
export type RequestPasswordResetDto = z.infer<
  typeof RequestPasswordResetDtoSchema
>;
