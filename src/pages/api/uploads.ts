// Third-party dependencies
import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import { put } from "@vercel/blob";

// Current project dependencies
import { TOKEN_NAME } from "../../constants";
import authenticateToken from "../../utils/authenticateToken";
import sendResponse from "../../utils/sendResponse";

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

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return sendResponse({
        data: { error: "No se envió ningún archivo." },
        message: "No se envió ningún archivo.",
        success: false,
        status: 400,
      });
    }

    const ext = path.extname(file.name || "");
    const newFileName = `${uuidv4()}${ext}`;
    const uploadDir = path.join(process.cwd(), "/tmp/uploads");

    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    const processedBuffer = await sharp(buffer).toBuffer();

    const blob = await put(newFileName, processedBuffer, {
      access: "public",
    });

    return sendResponse({
      data: { url: blob.url },
      message: "Archivo subido correctamente.",
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
