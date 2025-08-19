// Third-party dependencies
import type { AstroGlobal } from "astro";

// Current project dependencies
import validateToken from "./validateToken";

export const requireAuth = (Astro: AstroGlobal) => {
  const cookieHeader = Astro.request.headers.get("cookie");
  const token = cookieHeader
    ?.split("; ")
    .find((c) => c.startsWith("token="))
    ?.split("=")[1];
  const user = validateToken(token);

  if (!user) return Astro.redirect("/auth/login");
  return user;
};
