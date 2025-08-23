// Third-party dependencies
import { UAParser } from "ua-parser-js";

// Current project dependencies

/**
 * Obtiene la IP real y la información de dispositivo del cliente desde los headers.
 *
 * @param {Headers} headers - Los headers de la petición HTTP.
 * @returns {{ ipAddress: string, deviceName: string, deviceInfo: string }} Información del cliente
 */
const getClientInfo = (
  headers: Headers,
): { ipAddress: string; deviceName: string; deviceInfo: string } => {
  const cfIp = headers.get("CF-Connecting-IP");
  const xForwardedFor = headers.get("x-forwarded-for");

  const ipAddress =
    cfIp ||
    (xForwardedFor ? xForwardedFor.split(",")[0].trim() : "IP desconocida");

  const userAgent = headers.get("user-agent") || "";
  const parser = new UAParser(userAgent);

  const device = parser.getDevice();
  const os = parser.getOS();
  const browser = parser.getBrowser();

  let deviceName: string;

  if (device.model) {
    deviceName = device.model;
  } else if (os.name) {
    deviceName = os.name;
  } else {
    deviceName = "Unknown Device";
  }

  const deviceInfo = `${browser.name ?? "Unknown Browser"} ${
    browser.version ?? ""
  } - ${os.name ?? "Unknown OS"} ${os.version ?? ""}`;

  return { ipAddress, deviceName, deviceInfo };
};

export default getClientInfo;
