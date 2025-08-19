// Third-party dependencies
import type { APIRoute } from "astro";

// Current project dependencies
import prisma from "../../lib/prisma";
import sendResponse from "../../utils/sendResponse";
import validateToken from "../../utils/validateToken";
import { DeYoPaTuDtoSchema } from "../../schemas/deyopatu";

export const prerender = false;

interface JwtUserPayload {
  id: string;
}

export const POST: APIRoute = async ({ request, cookies }) => {
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

    const { id: creatorId } = userPayloadRaw as JwtUserPayload;

    const creator = await prisma.user.findUnique({ where: { id: creatorId } });

    if (!creator) {
      return sendResponse({
        data: { error: "Usuario creador no encontrado." },
        message: "Usuario creador no encontrado.",
        success: false,
        status: 404,
      });
    }

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

    const { recipientId, title, content, writtenAt, spotifyEmbedTrackSrc } =
      parsed.data;

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

    if (recipientId === creatorId) {
      return sendResponse({
        data: { error: "No puedes enviarte un DeYoPaTu a ti mismo." },
        message: "No puedes ser tu propio destinatario.",
        success: false,
        status: 400,
      });
    }

    const newDeYoPaTu = await prisma.deYoPaTu.create({
      data: {
        creatorId,
        recipientId,
        title,
        content,
        writtenAt,
        spotifyEmbedTrackSrc,
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
