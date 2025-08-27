// Third-party dependencies
import { S3Client } from "@aws-sdk/client-s3";

// Current project dependencies

const params = {
  endpoint: process.env.MINIO_API_URL || "",
  region: process.env.MINIO_REGION || "",
  credentials: {
    accessKeyId: process.env.MINIO_DEPLOY_USER || "",
    secretAccessKey: process.env.MINIO_DEPLOY_PASSWORD || "",
  },
  forcePathStyle: true,
};

const s3 = new S3Client(params);

export default s3;
