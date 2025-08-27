// Third-party dependencies
import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";

// Current project dependencies
import { RegisterDtoSchema } from "../../../schemas/auth/register";
import getFirstZodErrorMessage from "../../../utils/getFirstZodErrorMessage";
import prisma from "../../../lib/prisma";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "../../../constants/httpStatus";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      return sendResponse({
        data: { error: "Datos de registro no proporcionados." },
        message: "Datos de registro no proporcionados.",
        success: false,
        status: httpStatus.badRequest.code,
      });
    }

    const parsed = RegisterDtoSchema.safeParse(body);

    if (!parsed.success) {
      return sendResponse({
        data: { error: getFirstZodErrorMessage(parsed.error) },
        message: getFirstZodErrorMessage(parsed.error),
        success: false,
        status: httpStatus.badRequest.code,
      });
    }

    const { email, password, firstName, lastName } = parsed.data;

    const allowedDomains = ["@gmail.com", "@hotmail.com"];
    const emailLower = email.toLowerCase();

    if (!allowedDomains.some((domain) => emailLower.endsWith(domain))) {
      return sendResponse({
        data: { error: "Solo se permiten correos @gmail.com o @hotmail.com." },
        message: "Solo se permiten correos @gmail.com o @hotmail.com.",
        success: false,
        status: httpStatus.badRequest.code,
      });
    }

    const randomUsername = `churri_${Math.random()
      .toString(36)
      .substring(2, 16)}`;

    const existingEmail = await prisma.user.findUnique({ where: { email } });

    if (existingEmail) {
      return sendResponse({
        data: { error: "Ya existe un usuario con ese correo electrónico." },
        message: "Ya existe un usuario con ese correo electrónico.",
        success: false,
        status: httpStatus.badRequest.code,
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
        status: httpStatus.badRequest.code,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username: randomUsername,
        email,
        hashedPassword,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      },
    });

    return sendResponse({
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email.toLowerCase().trim(),
      },
      message: "Usuario registrado exitosamente",
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
