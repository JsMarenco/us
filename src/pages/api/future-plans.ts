// Third-party dependencies
import type { APIRoute } from "astro";

// Current project dependencies
import prisma from "../../lib/prisma";
import sendResponse from "../../utils/sendResponse";
import validateToken from "../../utils/validateToken";
import { FuturePlanDtoSchema } from "../../schemas/futurePlan";

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

    const { id: proposerId } = userPayloadRaw as JwtUserPayload;

    const proposer = await prisma.user.findUnique({
      where: { id: proposerId },
    });

    if (!proposer) {
      return sendResponse({
        data: { error: "Usuario proponente no encontrado." },
        message: "Usuario proponente no encontrado.",
        success: false,
        status: 404,
      });
    }

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

    const { title, description, status, priority, dueDate } = parsed.data;

    const newFuturePlan = await prisma.futurePlan.create({
      data: {
        proposerId,
        title,
        description,
        status,
        priority,
        dueDate,
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
