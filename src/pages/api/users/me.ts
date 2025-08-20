// Third-party dependencies
import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";

// Current project dependencies
import prisma from "../../../lib/prisma";
import sendResponse from "../../../utils/sendResponse";
import validateToken from "../../../utils/validateToken";
import { TOKEN_NAME } from "../../../constants";
import authenticateToken from "../../../utils/authenticateToken";
import { UserPublicSchema } from "../../../schemas/user";

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
  try {
    const token = cookies.get(TOKEN_NAME)?.value;
    const auth = await authenticateToken(token);

    if (!auth) {
      cookies.delete(TOKEN_NAME, { path: "/" });
      return sendResponse({
        data: { error: "No autorizado." },
        message: "Inicia sesión primero.",
        success: false,
        status: 401,
      });
    }

    const { user } = auth;

    if (!user) {
      return sendResponse({
        data: { error: "Usuario no encontrado." },
        message: "Usuario no encontrado.",
        success: false,
        status: 404,
      });
    }

    return sendResponse({
      data: UserPublicSchema.parse(user),
      message: "Usuario autenticado obtenido correctamente.",
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
