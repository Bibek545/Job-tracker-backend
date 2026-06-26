import nodemailer from "nodemailer"
const nodemailer = require("nodemailer");

//creating a transporter using SMTP
export const transporter = nodemailer.createTransport({
    host: "smtp.exaample.com",
    port: 587,
    secure: false,
    auth: {
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS,
    },
});

try {
  await transporter.verify();
  console.log("Server is ready to send the messages")
} catch (error) {
    console.error("Verification failed: ", error)
}