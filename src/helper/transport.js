import nodemailer from "nodemailer"
// const nodemailer = require("nodemailer");

//creating a transporter using SMTP
export const emailTransporter = () => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS,
    },
});

    transporter.verify((err, success) => {
  if (err) {
    console.error("❌ SMTP login failed:", err.message);
  } else {
    console.log("✅ SMTP connection verified");
  }
});
    return transporter;
}