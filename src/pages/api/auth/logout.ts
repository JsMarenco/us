// Third-party dependencies

// Current project dependencies
import type { APIRoute } from "astro";
import { TOKEN_NAME } from "../../../constants";
import prisma from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import validateToken from "../../../utils/validateToken";
import type { JwtUserPayload } from "../../../types/api";

export const prerender = false;

export const POST: APIRoute = async ({ cookies }) => {
  const token = cookies.get(TOKEN_NAME)?.value;

  const headers = new Headers();

  const cookie = [
    "token=;",
    "Path=/",
    "Max-Age=0",
    "SameSite=Strict",
    import.meta.env.NODE_ENV === "production" ? "Secure" : "",
    "HttpOnly",
  ]
    .filter(Boolean)
    .join("; ");

  headers.append("Set-Cookie", cookie);

  if (token) {
    try {
      const payload = validateToken(token) as JwtUserPayload | null;

      if (payload?.id) {
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

        if (session) {
          await prisma.session.delete({ where: { id: session.id } });
        }
      }
      // eslint-disable-next-line unused-imports/no-unused-vars
    } catch (error) {
      /* empty */
    }
  }

  headers.append("Location", "/auth/login");

  return new Response(null, {
    status: 302,
    headers,
  });
};
