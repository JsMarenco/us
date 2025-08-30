// Third-party dependencies
import type { APIRoute } from "astro";

// Current project dependencies
import sendResponse from "../../../utils/sendResponse";
import { TOKEN_NAME } from "../../../constants";
import authenticateToken from "../../../utils/sessions/authenticateToken";
import { UserPublicSchema } from "../../../schemas/user";
import httpStatus from "../../../constants/httpStatus";

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
  try {
    const token = cookies.get(TOKEN_NAME)?.value;
    const auth = await authenticateToken(token);

    if (!auth) {
      cookies.delete(TOKEN_NAME, { path: "/auth/login" });
      return sendResponse({
        data: { error: "No autorizado." },
        message: "Inicia sesión primero.",
        success: false,
        status: httpStatus.unauthorized.code,
      });
    }

    const { user } = auth;

    if (!user) {
      return sendResponse({
        data: { error: "Usuario no encontrado." },
        message: "Usuario no encontrado.",
        success: false,
        status: httpStatus.noContent.code,
      });
    }

    return sendResponse({
      data: UserPublicSchema.parse(user),
      message: "Usuario autenticado obtenido correctamente.",
      success: true,
      status: httpStatus.ok.code,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return sendResponse({
      data: { error: "Error interno del servidor." },
      message: "Error interno del servidor.",
      success: false,
      status: httpStatus.serverError.code,
    });
  }
};
