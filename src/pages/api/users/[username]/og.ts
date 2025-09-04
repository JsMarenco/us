// Third-party dependencies
import type { APIRoute } from "astro";

// Current project dependencies
import prisma from "../../../../lib/prisma";
import sendResponse from "../../../../utils/sendResponse";
import httpStatus from "../../../../constants/httpStatus";
import generateUserProfileOGImage from "../../../../utils/images/og/generateUserProfile";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const { username } = params;

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: username?.toString(),
          mode: "insensitive",
        },
      },
    });

    if (!user) {
      return sendResponse({
        data: { error: "No encontrado" },
        message: "El recurso no existe.",
        success: false,
        status: httpStatus.notFound.code,
      });
    }

    return generateUserProfileOGImage({ user });
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
