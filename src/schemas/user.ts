// Third-party dependencies
import { z } from "zod";

// Current project dependencies

const UserSchema = z.object({
  id: z.string().min(3, { message: "El ID es requerido" }),

  firstName: z.string().optional().default(""),
  lastName: z.string().optional().default(""),

  username: z.string().min(3, {
    message: "El nombre de usuario debe tener al menos 3 caracteres",
  }),
  email: z.string().email({ message: "Debe ser un correo válido" }),

  bio: z
    .string()
    .max(300, { message: "La biografía no puede exceder los 300 caracteres" })
    .optional()
    .default("")
    .nullable(),

  hashedPassword: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  avatarSrc: z.string().optional().default(""),

  createdAt: z
    .string()
    .optional()
    .default(() => new Date().toISOString()),
  updatedAt: z
    .string()
    .optional()
    .default(() => new Date().toISOString()),
});

export const UserEditDtoSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    username: z
      .string()
      .min(3, {
        message: "El nombre de usuario debe tener al menos 3 caracteres",
      })
      .optional(),
    bio: z
      .string()
      .max(300, { message: "La biografía no puede exceder los 300 caracteres" })
      .optional()
      .default("")
      .nullable(),
    email: z
      .string()
      .email({ message: "Debe ser un correo válido" })
      .optional(),
    currentPassword: z.string().min(6, {
      message: "La contraseña actual debe tener al menos 6 caracteres",
    }),
    avatarSrc: z.string().optional().default(""),
    newPassword: z.string().optional(),
    confirmNewPassword: z.string().optional(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "La nueva contraseña y la confirmación no coinciden",
    path: ["confirmNewPassword"],
  });

export const UserPublicSchema = UserSchema.omit({
  hashedPassword: true,
  createdAt: true,
  updatedAt: true,
});

export type User = z.infer<typeof UserPublicSchema>;
export type UserEditDto = z.infer<typeof UserEditDtoSchema>;

export default UserSchema;
