"use server";
import nodemailer from "nodemailer";

// Resend also works for email
// React-email is also somethig to consider

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "taya16@ethereal.email",
    pass: "k5UcMyNJVmmR8rAEMv",
  },
});

export async function sendMail(
  toEmail: string,
  subject: string,
  content: string
) {
  const response = await transporter.sendMail({
    to: toEmail,
    subject: subject,
    text: content,
    html: content,
  });
  if (response.accepted.length === 0) {
    throw new Error("Failed to send email", { cause: response });
  }
  console.log("Email sent: ", response);
}
