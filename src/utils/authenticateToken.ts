// Third-party dependencies
import bcrypt from "bcryptjs";

// Current project dependencies
import prisma from "../lib/prisma";
import validateToken from "./validateToken";
import type { AuthResult, JwtUserPayload } from "../types/api";

const authenticateToken = async (
  token: string | undefined,
): Promise<AuthResult | null> => {
  if (!token) return null;

  const payload = validateToken(token) as JwtUserPayload | null;

  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.id },
  });

  if (!user || !user.tokenHash) return null;

  const isValid = await bcrypt.compare(token, user.tokenHash);

  if (!isValid) return null;

  return { user, userId: payload.id };
};

export default authenticateToken;
