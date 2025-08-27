// Third-party dependencies
import path from "path";

import fs from "fs-extra";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import mime from "mime-types";
import getAudioDurationInSeconds from "get-audio-duration";
import getVideoDurationInSeconds from "get-video-duration";
import logger from "../logger";

// Current project dependencies

const uploadFileToMinIO = async ({
  relativeFilePath,
  folder,
  s3,
}: {
  s3: S3Client;
  relativeFilePath: string;
  folder: string;
}): Promise<{
  success: boolean;
  publicUrl: string;
  contentType: string;
  duration?: number;
}> => {
  try {
    const tempFilePath = path.join(process.cwd(), relativeFilePath);
    const extension = path.extname(tempFilePath);
    const mimeType = mime.lookup(extension);

    if (!mimeType) {
      throw new Error(`Unknown MIME type for extension ${extension}`);
    }

    const remoteFileName =
      `${folder}/${uuidv4()}.${extension.replace(".", "")}`.replace(
        /\/\//g,
        "/",
      );
    const fileStream = fs.createReadStream(tempFilePath);

    fileStream.on("error", (err) => {
      logger.error("Error reading file stream:", err);
      throw err;
    });

    const s3Params = {
      Bucket: process.env.MINIO_BUCKET_NAME,
      Key: remoteFileName,
      Body: fileStream,
      ContentType: mimeType,
    };

    const command = new PutObjectCommand(s3Params);

    await s3.send(command);

    const pathname =
      `${process.env.MINIO_BUCKET_NAME}/${remoteFileName}`.replace(
        /\/\//g,
        "/",
      );

    if (!process.env.VITE_PUBLIC_MINIO_API_URL) {
      throw new Error(
        "VITE_PUBLIC_MINIO_API_URL environment variable is not defined",
      );
    }

    const publicUrl = `${process.env.VITE_PUBLIC_MINIO_API_URL.replace(/\/$/, "")}/${pathname}`;

    let duration: number | undefined;

    if (mimeType.startsWith("audio/")) {
      duration = await getAudioDurationInSeconds(tempFilePath);
    } else if (mimeType.startsWith("video/")) {
      duration = await getVideoDurationInSeconds(tempFilePath);
    }

    const response = {
      success: true,
      publicUrl: publicUrl.toString(),
      contentType: mimeType,
      duration,
    };

    return response;
  } catch (error: any) {
    logger.error("Error uploading file to MinIO", error);

    const response = {
      success: false,
      publicUrl: "",
      contentType: "",
    };

    return response;
  }
};

export default uploadFileToMinIO;
