// Third-party dependencies
import { PrismaClient } from "@prisma/client";

// Current project dependencies

const prisma = new PrismaClient({
  datasourceUrl: import.meta.env.DATABASE_URL,
});

export default prisma;
