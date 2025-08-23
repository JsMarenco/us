// Third-party dependencies
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import handlebars from "handlebars";

/**
 * The Gmail account email used to send emails.
 * Loaded from environment variables.
 */
export const emailSenderUser = import.meta.env.SENDER_GMAIL_USER || "";

/**
 * The Gmail account app password used for authentication.
 * Loaded from environment variables.
 */
export const emailSenderPass = import.meta.env.SENDER_GMAIL_PASS || "";

/**
 * Nodemailer transporter configured for sending emails.
 * Can be used to send any type of email in the project.
 */
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailSenderUser,
    pass: emailSenderPass,
  },
});

/**
 * Renders an HTML email template with dynamic data.
 *
 * @param templateName - The name of the template file (e.g., "resetPassword.hbs").
 * @param data - An object containing key-value pairs to inject into the template.
 * @returns The HTML string ready to be sent via email.
 */
export const renderTemplate = (
  templateName: string,
  data: Record<string, any>,
) => {
  const filePath = path.join(process.cwd(), "src/emails", templateName);
  const source = fs.readFileSync(filePath, "utf8");
  const template = handlebars.compile(source);

  return template(data);
};
