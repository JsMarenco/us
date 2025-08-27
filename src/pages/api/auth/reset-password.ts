// Third-party dependencies
import type { APIRoute } from "astro";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Current project dependencies
import prisma from "../../../lib/prisma";
import sendResponse from "../../../utils/sendResponse";
import { ResetPasswordDtoSchema } from "../../../schemas/auth/password";
import getFirstZodErrorMessage from "../../../utils/getFirstZodErrorMessage";
import { sendPasswordResetSuccessEmail } from "../../../utils/emails";
import httpStatus from "../../../constants/httpStatus";

export const prerender = false;

const JWT_SECRET = import.meta.env.JWT_SECRET || "secret";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      return sendResponse({
        data: { error: "Datos no proporcionados." },
        message: "Datos no proporcionados.",
        success: false,
        status: httpStatus.badRequest.code,
      });
    }

    const parsed = ResetPasswordDtoSchema.safeParse(body);

    if (!parsed.success) {
      return sendResponse({
        data: { error: getFirstZodErrorMessage(parsed.error) },
        message: getFirstZodErrorMessage(parsed.error),
        success: false,
        status: httpStatus.badRequest.code,
      });
    }

    const { token, password } = parsed.data;

    let payload: any;

    try {
      payload = jwt.verify(token, JWT_SECRET);
      // eslint-disable-next-line unused-imports/no-unused-vars
    } catch (err) {
      return sendResponse({
        data: { error: "Token inválido o expirado." },
        message: "Token inválido o expirado.",
        success: false,
        status: httpStatus.badRequest.code,
      });
    }

    const user = await prisma.user.findUnique({ where: { id: payload.id } });

    if (!user || !user.resetTokenHash || !user.resetTokenExpiresAt) {
      return sendResponse({
        data: { error: "Token inválido o expirado." },
        message: "Token inválido o expirado.",
        success: false,
        status: httpStatus.badRequest.code,
      });
    }

    if (user.resetTokenExpiresAt < new Date()) {
      return sendResponse({
        data: { error: "Token expirado." },
        message: "Token expirado.",
        success: false,
        status: httpStatus.badRequest.code,
      });
    }

    const isTokenValid = await bcrypt.compare(token, user.resetTokenHash);

    if (!isTokenValid) {
      return sendResponse({
        data: { error: "Token inválido." },
        message: "Token inválido.",
        success: false,
        status: httpStatus.badRequest.code,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        hashedPassword,
        resetTokenHash: null,
        resetTokenCreatedAt: null,
        resetTokenExpiresAt: null,
        resetRequestCount: 0,
        resetRequestDate: null,
        lastPasswordResetAt: new Date(),
      },
    });

    const url = new URL(request.url);
    const host = url.origin;
    const loginLink = `${host}/auth/login`;
    const { firstName: first, lastName: last, username: fallback } = user;
    const fullname = [first, last].filter(Boolean).join(" ") || fallback;

    await sendPasswordResetSuccessEmail({
      to: user.email,
      fullname,
      loginLink,
    });

    return sendResponse({
      data: { message: "Contraseña actualizada correctamente." },
      message: "Contraseña actualizada correctamente.",
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
