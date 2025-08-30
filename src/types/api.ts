// Third-party dependencies

// Current project dependencies
import type { User } from "@prisma/client";

export interface JwtUserPayload {
  id: string;
}

export interface AuthResult {
  user: User;
  userId: string;
  username: string;
}
