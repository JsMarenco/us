// Third-party dependencies
import type { APIRoute } from "astro";

// Current project dependencies
import prisma from "../../lib/prisma";
import sendResponse from "../../utils/sendResponse";
import validateToken from "../../utils/validateToken";
import { DeYoPaTuDtoSchema } from "../../schemas/deyopatu";
import { TOKEN_NAME } from "../../constants";
import authenticateToken from "../../utils/sessions/authenticateToken";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
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

    const { user: creator } = auth;

    const body = await request.json();
    const parsed = DeYoPaTuDtoSchema.safeParse(body);

    if (!parsed.success) {
      return sendResponse({
        data: { error: parsed.error.flatten().fieldErrors },
        message: "Datos inválidos.",
        success: false,
        status: 400,
      });
    }

    const {
      recipientId,
      title,
      content,
      writtenAt,
      spotifyEmbedTrackSrc,
      thumbnailSrc,
    } = parsed.data;

    const recipient = await prisma.user.findUnique({
      where: { id: recipientId },
    });

    if (!recipient) {
      return sendResponse({
        data: { error: "El destinatario no existe." },
        message: "El destinatario no existe.",
        success: false,
        status: 404,
      });
    }

    if (recipientId === creator.id) {
      return sendResponse({
        data: { error: "No puedes enviarte un DeYoPaTu a ti mismo." },
        message: "No puedes ser tu propio destinatario.",
        success: false,
        status: 400,
      });
    }

    const newDeYoPaTu = await prisma.deYoPaTu.create({
      data: {
        creatorId: creator.id,
        recipientId,
        title,
        content,
        writtenAt,
        spotifyEmbedTrackSrc,
        thumbnailSrc,
      },
    });

    return sendResponse({
      data: newDeYoPaTu,
      message: "DeYoPaTu creado correctamente.",
      success: true,
      status: 201,
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
