// Third-party dependencies
import { ZodError } from "zod";

// Current project dependencies

/**
 * Extracts the first validation error message from a ZodError.
 * Useful for showing a user-friendly error from a schema validation.
 *
 * @param error - The ZodError object (from safeParse)
 * @returns The first error message found, or a fallback string.
 */
const getFirstZodErrorMessage = (error?: ZodError): string => {
  if (!error) return "Invalid request body.";

  const formattedError = error.flatten();

  const fieldErrors = Object.values(formattedError.fieldErrors).flat();

  if (fieldErrors && fieldErrors.length > 0) {
    return fieldErrors[0] || "Invalid request body.";
  }

  if (formattedError.formErrors.length > 0) {
    return formattedError.formErrors[0];
  }

  // Fallback
  return "Invalid request body.";
};

export default getFirstZodErrorMessage;
