// Third-party dependencies
import bcrypt from "bcryptjs";

// Current project dependencies
import prisma from "../../lib/prisma";
import validateToken from "../validateToken";
import type { AuthResult, JwtUserPayload } from "../../types/api";

const authenticateToken = async (
  token: string | undefined,
): Promise<AuthResult | null> => {
  if (!token) return null;

  const payload = validateToken(token) as JwtUserPayload | null;

  if (!payload) return null;

  const sessions = await prisma.session.findMany({
    where: {
      userId: payload.id,
      expiresAt: { gte: new Date() },
    },
  });

  const session = await Promise.all(
    sessions.map(async (s) => {
      const match = await bcrypt.compare(token, s.tokenHash);

      return match ? s : null;
    }),
  ).then((results) => results.find(Boolean));

  if (!session) return null;

  const user = await prisma.user.findUnique({ where: { id: payload.id } });

  if (!user) return null;

  return { user, userId: payload.id, username: user.username };
};

export default authenticateToken;
