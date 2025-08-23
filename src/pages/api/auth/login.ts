// Third-party dependencies
import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Current project dependencies
import { LoginDtoSchema } from "../../../schemas/auth/login";
import getFirstZodErrorMessage from "../../../utils/getFirstZodErrorMessage";
import prisma from "../../../lib/prisma";
import sendResponse from "../../../utils/sendResponse";
import { TOKEN_NAME } from "../../../constants";
import getClientInfo from "../../../utils/getClientInfo";

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

    const parsed = LoginDtoSchema.safeParse(body);

    if (!parsed.success) {
      return sendResponse({
        data: { error: getFirstZodErrorMessage(parsed.error) },
        message: getFirstZodErrorMessage(parsed.error),
        success: false,
        status: 400,
      });
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return sendResponse({
        data: { error: "Credenciales inválidas." },
        message: "Credenciales inválidas.",
        success: false,
        status: 401,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return sendResponse({
        data: { error: "Credenciales inválidas." },
        message: "Credenciales inválidas.",
        success: false,
        status: 401,
      });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
    const sessionTokenHash = await bcrypt.hash(token, 10);
    const { deviceInfo, deviceName, ipAddress } = getClientInfo(
      request.headers,
    );

    await prisma.session.create({
      data: {
        userId: user.id,
        tokenHash: sessionTokenHash,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        ipAddress,
        deviceName,
        deviceInfo,
      },
    });

    const headers = new Headers();
    const secureFlag = import.meta.env.NODE_ENV ? "" : "Secure";
    const cookie = [
      `${TOKEN_NAME}=${token}`,
      "Path=/",
      `Max-Age=${7 * 24 * 60 * 60}`,
      "SameSite=Strict",
      secureFlag,
    ]
      .filter(Boolean)
      .join("; ");

    headers.append("Set-Cookie", cookie);

    return new Response(
      JSON.stringify({
        data: { message: "Inicio de sesión exitoso." },
        message: "Inicio de sesión exitoso.",
        success: true,
        status: 200,
      }),
      { status: 200, headers },
    );
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
