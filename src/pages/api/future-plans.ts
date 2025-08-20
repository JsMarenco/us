// Third-party dependencies
import type { APIRoute } from "astro";

// Current project dependencies
import prisma from "../../lib/prisma";
import sendResponse from "../../utils/sendResponse";
import { FuturePlanDtoSchema } from "../../schemas/futurePlan";
import { TOKEN_NAME } from "../../constants";
import authenticateToken from "../../utils/authenticateToken";

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

    const { user: proposer } = auth;

    const body = await request.json();
    const parsed = FuturePlanDtoSchema.safeParse(body);

    if (!parsed.success) {
      return sendResponse({
        data: { error: parsed.error.flatten().fieldErrors },
        message: "Datos inválidos.",
        success: false,
        status: 400,
      });
    }

    const { title, description, status, priority, dueDate, thumbnailSrc } =
      parsed.data;

    const newFuturePlan = await prisma.futurePlan.create({
      data: {
        proposerId: proposer.id,
        title,
        description,
        status,
        priority,
        dueDate,
        thumbnailSrc,
      },
    });

    return sendResponse({
      data: newFuturePlan,
      message: "Plan creado correctamente.",
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
