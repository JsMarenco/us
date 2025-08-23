// Third-party dependencies

// Current project dependencies
import { emailSenderUser, renderTemplate, transporter } from "./mailer";

/**
 * Sends a password reset email to a user.
 *
 * @param options - An object containing all parameters for the email.
 * @param options.to - The recipient's email address.
 * @param options.username - The full name or username of the recipient to personalize the email.
 * @param options.resetLink - The URL the user can click to reset their password.
 * @returns A promise that resolves when the email has been sent.
 */
export const sendPasswordResetEmail = async ({
  to,
  fullname,
  resetLink,
}: {
  to: string;
  fullname: string;
  resetLink: string;
}) => {
  const html = renderTemplate("resetPassword.hbs", { fullname, resetLink });

  await transporter.sendMail({
    from: `Cocotón <${emailSenderUser}>`,
    to,
    subject: "Recuperar contraseña",
    html,
  });
};

/**
 * Sends a confirmation email after a successful password reset.
 *
 * @param options - An object containing all parameters for the email.
 * @param options.to - The recipient's email address.
 * @param options.fullname - The full name or username of the recipient to personalize the email.
 * @param options.loginLink - The URL the user can click to log in.
 * @returns A promise that resolves when the email has been sent.
 */
export const sendPasswordResetSuccessEmail = async ({
  to,
  fullname,
  loginLink,
}: {
  to: string;
  fullname: string;
  loginLink: string;
}) => {
  const html = renderTemplate("passwordResetSuccess.hbs", {
    fullname,
    loginLink,
  });

  await transporter.sendMail({
    from: `Cocotón <${emailSenderUser}>`,
    to,
    subject: "Contraseña restablecida con éxito",
    html,
  });
};
