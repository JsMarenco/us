// Third-party dependencies
import type { APIRoute } from "astro";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// import nodemailer from "nodemailer";

// Current project dependencies
import prisma from "../../../lib/prisma";
import sendResponse from "../../../utils/sendResponse";
import { RequestPasswordResetDtoSchema } from "../../../schemas/auth/password";
import getFirstZodErrorMessage from "../../../utils/getFirstZodErrorMessage";

export const prerender = false;

const JWT_SECRET = import.meta.env.JWT_SECRET || "secret";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      return sendResponse({
        data: { error: "Credenciales no proporcionadas." },
        message: "Credenciales no proporcionadas.",
        success: false,
        status: 400,
      });
    }

    const parsed = RequestPasswordResetDtoSchema.safeParse(body);

    if (!parsed.success) {
      return sendResponse({
        data: { error: getFirstZodErrorMessage(parsed.error) },
        message: getFirstZodErrorMessage(parsed.error),
        success: false,
        status: 400,
      });
    }

    const { email } = body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return sendResponse({
        data: {
          message: "Si el correo existe, se enviará un enlace de recuperación.",
        },
        message: "Si el correo existe, se enviará un enlace de recuperación.",
        success: true,
        status: 200,
      });
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (user.resetRequestDate && user.resetRequestDate >= today) {
      if ((user.resetRequestCount || 0) >= 3) {
        return sendResponse({
          data: { error: "Límite de solicitudes alcanzado. Intenta mañana." },
          message: "Límite de solicitudes alcanzado. Intenta mañana.",
          success: false,
          status: 429,
        });
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetRequestCount: { increment: 1 },
        },
      });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetRequestCount: 1,
          resetRequestDate: new Date(),
        },
      });
    }

    const resetToken = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "5m" },
    );

    const resetTokenHash = await bcrypt.hash(resetToken, 10);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 5 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetTokenHash,
        resetTokenCreatedAt: now,
        resetTokenExpiresAt: expiresAt,
      },
    });

    const url = new URL(request.url);
    const host = url.origin;
    const resetLink = `${host}/auth/reset-password/${resetToken}`;
    const isDev = import.meta.env.NODE_ENV === "development";
    const dataToReturn = isDev ? { resetLink } : null;

    // const senderUser = import.meta.env.SENDER_GMAIL_USER || "";
    // const senderPass = import.meta.env.SENDER_GMAIL_PASS || "";

    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: senderUser,
    //     pass: senderPass,
    //   },
    // });

    // await transporter.sendMail({
    //   from: `Cocotón <${senderUser}>`,
    //   to: user.email,
    //   subject: "Recuperar contraseña",
    //   html: `<p>Haz clic <a href="${resetLink}">aquí</a> para restablecer tu contraseña</p>`,
    // });

    return sendResponse({
      data: dataToReturn,
      message: "Si el correo existe, se enviará un enlace de recuperación.",
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
