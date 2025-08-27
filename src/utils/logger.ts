// Third-party dependencies

// Current project dependencies

/* eslint-disable no-console */
const logger = {
  /**
   * Logs a success message with surrounding lines for emphasis.
   * @param {unknown} text - The text to be logged.
   * @example
   * logger.success("Operation successful!");
   * // Output:
   * // ✔ Operation successful!
   */
  success: (text: unknown) => {
    const message = `✓ ${text}`;

    console.log(message);
  },
  /**
   * Logs an error message with surrounding lines for emphasis.
   * @param {unknown} text - The text to be logged.
   * @param {any} [error] - Optional error object to log.
   * @example
   * logger.error("An error occurred!");
   * // Output:
   * // ✖ An error occurred!
   */
  error: (text: unknown, error?: any) => {
    const message = `🚨 ${text}`;

    console.log(message);

    if (error instanceof Error) {
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);
    } else if (error && typeof error === "object") {
      console.error(JSON.stringify(error, null, 2));
    } else if (error !== undefined) {
      console.error(`Error detail: ${String(error)}`);
    }
  },
  /**
   * Logs an information message with surrounding lines for emphasis.
   * @param {unknown} text - The text to be logged.
   * @example
   * logger.info("Information message");
   * // Output:
   * // !  Information message
   */
  info: (text: unknown) => {
    const message = ` ! ${text}`;

    console.log(message);
  },
};

export default logger;
