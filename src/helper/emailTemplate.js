import nodemailer from "nodemailer";

export const passwordResetOTPEmailTemplate = ({email, name, otp}) => {
    return {
        from: `'Job-Tracker <${process.env.SMTP_USER}>'`,
         to: `${email}`,
        subject: `Reset your password`,
        text: `'Hello ${name}, here is your OTP to rese the password.'`,
        html: `
        <p>Dear ${name} </p>
        <br />
        <p>Here is your otp to reset the password. This will expire in 5 min.
        <br />

        ${otp}.</p>
        <br />
        Thank you
        `
    }
}