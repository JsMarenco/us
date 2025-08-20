// Third-party dependencies

// Current project dependencies
import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async () => {
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

  headers.append("Location", "/auth/login");

  return new Response(null, {
    status: 302,
    headers,
  });
};
