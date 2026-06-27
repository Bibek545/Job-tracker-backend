import { passwordResetOTPEmailTemplate } from "./emailTemplate.js";
import {emailTransporter} from "./transport.js"
// import nodemailer from "nodemailer";

export const passwordResetOTPEmail = async (obj) => {
  const transport = emailTransporter();
  const info = await transport.sendMail(passwordResetOTPEmailTemplate(obj));
  return info.messageId;
}