// Third-party dependencies
import type { APIRoute } from "astro";

// Current project dependencies
import prisma from "../../../lib/prisma";
import sendResponse from "../../../utils/sendResponse";
import validateToken from "../../../utils/validateToken";

export const prerender = false;

interface JwtUserPayload {
  id: string;
}

export const GET: APIRoute = async ({ cookies }) => {
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

    const user = await prisma.user.findUnique({
      where: { id: userPayload.id },
      omit: { hashedPassword: true },
    });

    if (!user) {
      return sendResponse({
        data: { error: "Usuario no encontrado." },
        message: "Usuario no encontrado.",
        success: false,
        status: 404,
      });
    }

    return sendResponse({
      data: user,
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
