// Third-party dependencies

// Current project dependencies

type SendResponseProps<T> = {
  data: T;
  message?: string;
  success?: boolean;
  status?: number;
};

/**
 * Sends a standardized JSON response for API endpoints.
 *
 * @template T - The type of the data object being returned.
 * @param {T} data - The main payload of the response.
 * @param {string} [message="Success"] - A human-readable message describing the result.
 * @param {boolean} [success=true] - Indicates whether the operation was successful.
 * @param {number} [status=200] - The HTTP status code of the response.
 * @returns {Response} A Response object containing a JSON object with `data`, `message`, and `success`.
 *
 * @example
 * sendResponse({ id: 1, name: "Juan" }, "User created successfully", true, 201)
 */
const sendResponse = <T>({
  data,
  message = "Success",
  success = true,
  status = 200,
}: SendResponseProps<T>): Response => {
  return new Response(JSON.stringify({ data, message, success }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
};

export default sendResponse;
