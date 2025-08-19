// Third-party dependencies
import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";

// Current project dependencies
import { RegisterDtoSchema } from "../../../schemas/auth/register";
import getFirstZodErrorMessage from "../../../utils/getFirstZodErrorMessage";
import prisma from "../../../lib/prisma";
import sendResponse from "../../../utils/sendResponse";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      return sendResponse({
        data: { error: "Datos de registro no proporcionados." },
        message: "Datos de registro no proporcionados.",
        success: false,
        status: 400,
      });
    }

    const parsed = RegisterDtoSchema.safeParse(body);

    if (!parsed.success) {
      return sendResponse({
        data: { error: getFirstZodErrorMessage(parsed.error) },
        message: getFirstZodErrorMessage(parsed.error),
        success: false,
        status: 400,
      });
    }

    const { email, password } = parsed.data;

    // Enforce Gmail domain
    if (!email.toLowerCase().endsWith("@gmail.com")) {
      return sendResponse({
        data: { error: "Solo se permiten correos @gmail.com." },
        message: "Solo se permiten correos @gmail.com.",
        success: false,
        status: 400,
      });
    }

    // Generate random username (max 16 characters)
    const randomUsername = `user_${Math.random()
      .toString(36)
      .substring(2, 16)}`;

    // Check if email already exists
    const existingEmail = await prisma.user.findUnique({ where: { email } });

    if (existingEmail) {
      return sendResponse({
        data: { error: "Ya existe un usuario con ese correo electrónico." },
        message: "Ya existe un usuario con ese correo electrónico.",
        success: false,
        status: 400,
      });
    }

    const existingUsername = await prisma.user.findFirst({
      where: { username: randomUsername },
    });

    if (existingUsername) {
      return sendResponse({
        data: { error: "Ya existe un usuario con ese nombre de usuario." },
        message: "Ya existe un usuario con ese nombre de usuario.",
        success: false,
        status: 400,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save to database
    const newUser = await prisma.user.create({
      data: {
        username: randomUsername,
        email,
        hashedPassword,
      },
    });

    return sendResponse({
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      message: "Usuario registrado exitosamente",
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
