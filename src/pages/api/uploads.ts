// Third-party dependencies
import type { APIRoute } from "astro";
import fs from "fs-extra";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Current project dependencies
import { TOKEN_NAME } from "../../constants";
import authenticateToken from "../../utils/sessions/authenticateToken";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "../../constants/httpStatus";
import names from "../../constants/routes/folder/base";
import uploadFileToMinIO from "../../utils/minio/upload";
import s3 from "../../utils/s3/client";

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
        status: httpStatus.unauthorized.code,
      });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const folderPath = formData.get("folder")?.toString();
    const folderPathString = folderPath?.toString();

    if (!file) {
      return sendResponse({
        data: { error: "No se envió ningún archivo." },
        message: "No se envió ningún archivo.",
        success: false,
        status: httpStatus.badRequest.code,
      });
    }

    if (!(file instanceof File)) {
      return sendResponse({
        data: { error: "Tipo de archivo inválido." },
        message: "Tipo de archivo inválido.",
        success: false,
        status: httpStatus.badRequest.code,
      });
    }

    const uploadDir = "/tmp/uploads";

    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    const extension = path.extname(file.name);
    const allowedExtensions = [
      ".mp3",
      ".mp4",
      ".jpg",
      ".png",
      ".mpeg",
      ".webm",
      ".jpeg",
    ];

    if (!allowedExtensions.includes(extension)) {
      return sendResponse({
        data: { error: "Tipo de archivo no permitido." },
        message: "Tipo de archivo no permitido.",
        success: false,
        status: httpStatus.badRequest.code,
      });
    }

    const relativeTempDir = path.join(names.folders.temp.extra, uuidv4());
    const tempDir = path.join(process.cwd(), relativeTempDir);

    await fs.ensureDir(tempDir);

    const tempFilename = `${uuidv4()}${extension}`;
    const relativeTempFilePath = path.join(relativeTempDir, tempFilename);
    const tempFilePath = path.join(process.cwd(), relativeTempFilePath);

    await fs.writeFile(tempFilePath, buffer);

    const { publicUrl, success } = await uploadFileToMinIO({
      folder: folderPathString || names.folders.temp.extra,
      s3,
      relativeFilePath: relativeTempFilePath,
    });

    if (!success) {
      return sendResponse({
        data: { error: "Error subiendo el archivo." },
        message: "Error subiendo el archivo.",
        success: false,
        status: httpStatus.badRequest.code,
      });
    }

    return sendResponse({
      data: { url: publicUrl },
      message: "Archivo subido correctamente.",
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
