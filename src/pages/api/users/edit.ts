// Third-party dependencies
import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";

// Current project dependencies
import prisma from "../../../lib/prisma";
import sendResponse from "../../../utils/sendResponse";
import validateToken from "../../../utils/validateToken";
import { UserEditDtoSchema } from "../../../schemas/user";

export const prerender = false;

interface JwtUserPayload {
  id: string;
}

export const PUT: APIRoute = async ({ cookies, request }) => {
  try {
    const token = cookies.get("token")?.value;
    const userPayloadRaw = validateToken(token);

    if (!userPayloadRaw) {
      return sendResponse({
        data: { error: "No autorizado. Token inválido o inexistente." },
        message: "No autorizado. Inicia sesión primero.",
        success: false,
        status: 401,
      });
    }

    const userPayload = userPayloadRaw as JwtUserPayload;

    const existingUser = await prisma.user.findUnique({
      where: { id: userPayload.id },
    });

    if (!existingUser) {
      return sendResponse({
        data: { error: "Usuario no encontrado." },
        message: "Usuario no encontrado.",
        success: false,
        status: 404,
      });
    }

    const body = await request.json();

    const parsed = UserEditDtoSchema.safeParse(body);

    if (!parsed.success) {
      return sendResponse({
        data: parsed.error.format(),
        message: "Datos inválidos.",
        success: false,
        status: 400,
      });
    }

    const { currentPassword, newPassword, ...updateData } = parsed.data;

    const validPassword = await bcrypt.compare(
      currentPassword,
      existingUser.hashedPassword,
    );

    if (!validPassword) {
      return sendResponse({
        data: { error: "Contraseña actual incorrecta." },
        message: "Contraseña actual incorrecta.",
        success: false,
        status: 401,
      });
    }

    let hashedPassword = existingUser.hashedPassword;

    if (newPassword) {
      hashedPassword = await bcrypt.hash(newPassword, 10);
    }

    const { confirmNewPassword: _, ...userData } = updateData;

    const updatedUser = await prisma.user.update({
      where: { id: userPayload.id },
      data: {
        ...userData,
        hashedPassword,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return sendResponse({
      data: updatedUser,
      message: "Perfil actualizado correctamente.",
      success: true,
      status: 200,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return sendResponse({
      data: { error: "Error interno del servidor." },
      message: "Error interno del servidor.",
      success: false,
      status: 500,
    });
  }
};
