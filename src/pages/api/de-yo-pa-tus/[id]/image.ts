// Third-party dependencies
import type { APIRoute } from "astro";

// Current project dependencies
import prisma from "../../../../lib/prisma";
import sendResponse from "../../../../utils/sendResponse";
import httpStatus from "../../../../constants/httpStatus";
import generateDeYoPaTuImage from "../../../../utils/images/generateDeYoPaTuImage";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;

  try {
    const deYoPaTu = await prisma.deYoPaTu.findUnique({
      where: { id: String(id) },
      include: { creator: true },
    });

    if (!deYoPaTu) {
      return sendResponse({
        data: { error: "No encontrado" },
        message: "El recurso no existe.",
        success: false,
        status: httpStatus.notFound.code,
      });
    }

    return generateDeYoPaTuImage({ deYoPaTu, creator: deYoPaTu.creator });
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
