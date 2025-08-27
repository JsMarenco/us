// Third-party dependencies
import type { APIRoute } from "astro";

// Current project dependencies
import prisma from "../../lib/prisma";
import sendResponse from "../../utils/sendResponse";
import { DeYoPaTuDtoSchema } from "../../schemas/deyopatu";
import { TOKEN_NAME } from "../../constants";
import authenticateToken from "../../utils/sessions/authenticateToken";
import httpStatus from "../../constants/httpStatus";

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
        status: httpStatus.unauthorized.code,
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
        status: httpStatus.badRequest.code,
      });
    }

    const { title, content, writtenAt, spotifyEmbedTrackSrc, thumbnailSrc } =
      parsed.data;

    const newDeYoPaTu = await prisma.deYoPaTu.create({
      data: {
        creatorId: creator.id,
        title,
        content,
        writtenAt,
        spotifyEmbedTrackSrc,
        thumbnailSrc,
      },
    });

    const url = new URL(request.url);
    const host = url.origin;
    const previewLink = `${host}/de-yo-pa-tu/${newDeYoPaTu.id}`;

    return sendResponse({
      data: {
        previewLink,
      },
      message: "DeYoPaTu creado correctamente.",
      success: true,
      status: httpStatus.created.code,
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

export const PUT: APIRoute = async ({ request, cookies }) => {
  try {
    const token = cookies.get(TOKEN_NAME)?.value;
    const auth = await authenticateToken(token);

    if (!auth) {
      cookies.delete(TOKEN_NAME, { path: "/" });
      return sendResponse({
        data: { error: "No autorizado." },
        message: "Inicia sesión primero.",
        success: false,
        status: httpStatus.unauthorized.code,
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
        status: httpStatus.badRequest.code,
      });
    }

    const {
      id,
      title,
      content,
      writtenAt,
      spotifyEmbedTrackSrc,
      thumbnailSrc,
    } = parsed.data;

    if (!id || id.length !== 24) {
      return sendResponse({
        data: { error: "No existe un DeYoPaTu." },
        message: "Registro no encontrado.",
        success: false,
        status: httpStatus.badRequest.code,
      });
    }

    const existing = await prisma.deYoPaTu.findUnique({ where: { id } });

    if (!existing) {
      return sendResponse({
        data: { error: "No existe un DeYoPaTu." },
        message: "Registro no encontrado.",
        success: false,
        status: httpStatus.notFound.code,
      });
    }

    if (existing.creatorId !== creator.id) {
      return sendResponse({
        data: { error: "No tienes permisos para editar este DeYoPaTu." },
        message: "Acceso denegado.",
        success: false,
        status: httpStatus.forbidden.code,
      });
    }

    const updatedDeYoPaTu = await prisma.deYoPaTu.update({
      where: { id },
      data: {
        title,
        content,
        writtenAt,
        spotifyEmbedTrackSrc,
        thumbnailSrc,
      },
    });

    const url = new URL(request.url);
    const host = url.origin;
    const previewLink = `${host}/de-yo-pa-tu/${updatedDeYoPaTu.id}`;

    return sendResponse({
      data: { previewLink },
      message: "DeYoPaTu actualizado correctamente.",
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
