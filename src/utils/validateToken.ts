// Third-party dependencies
import jwt from "jsonwebtoken";

// Current project dependencies

const JWT_SECRET = import.meta.env.JWT_SECRET || "secret";

const validateToken = (token?: string) => {
  if (!token) return null;

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    return payload;
    // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (err) {
    return null;
  }
};

export default validateToken;
