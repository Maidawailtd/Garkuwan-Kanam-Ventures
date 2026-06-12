import { Router } from "express";
import nodemailer from "nodemailer";
import { logger } from "../lib/logger";

const router = Router();

router.post("/contact", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: "Name, email, and message are required." });
    return;
  }

  const TO = process.env.CONTACT_EMAIL_TO || "mglink@mail.com";
  const FROM = process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@gkc-ventures.com";

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.mail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;border:1px solid #e5e7eb;border-radius:4px;overflow:hidden">
      <div style="background:#1a1a1a;padding:28px 32px">
        <h2 style="color:#f5a623;margin:0;font-size:20px;letter-spacing:2px;text-transform:uppercase">
          Garkuwan Kanam & Co Ventures
        </h2>
        <p style="color:#9ca3af;margin:6px 0 0;font-size:12px;letter-spacing:1px;text-transform:uppercase">
          New Contact Form Submission
        </p>
      </div>
      <div style="padding:32px">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:10px 0;color:#6b7280;width:140px;vertical-align:top;font-weight:bold;text-transform:uppercase;letter-spacing:1px;font-size:11px">Name</td><td style="padding:10px 0;color:#111827">${name}</td></tr>
          <tr style="border-top:1px solid #f3f4f6"><td style="padding:10px 0;color:#6b7280;font-weight:bold;text-transform:uppercase;letter-spacing:1px;font-size:11px">Email</td><td style="padding:10px 0;color:#111827"><a href="mailto:${email}" style="color:#f5a623">${email}</a></td></tr>
          ${phone ? `<tr style="border-top:1px solid #f3f4f6"><td style="padding:10px 0;color:#6b7280;font-weight:bold;text-transform:uppercase;letter-spacing:1px;font-size:11px">Phone</td><td style="padding:10px 0;color:#111827">${phone}</td></tr>` : ""}
          ${subject ? `<tr style="border-top:1px solid #f3f4f6"><td style="padding:10px 0;color:#6b7280;font-weight:bold;text-transform:uppercase;letter-spacing:1px;font-size:11px">Subject</td><td style="padding:10px 0;color:#111827">${subject}</td></tr>` : ""}
        </table>
        <div style="margin-top:24px;padding:20px;background:#f9fafb;border-left:4px solid #f5a623">
          <p style="margin:0 0 8px;color:#6b7280;font-weight:bold;text-transform:uppercase;letter-spacing:1px;font-size:11px">Message</p>
          <p style="margin:0;color:#111827;line-height:1.7;white-space:pre-wrap">${message}</p>
        </div>
      </div>
      <div style="padding:20px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;font-size:11px;color:#9ca3af;text-align:center">
        Sent via gkc-ventures.com contact form · ${new Date().toUTCString()}
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"GKC Ventures Website" <${FROM}>`,
      to: TO,
      replyTo: email,
      subject: `[GKC Ventures] ${subject || "Contact Form"} — ${name}`,
      html,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "—"}\nSubject: ${subject || "—"}\n\nMessage:\n${message}`,
    });
    logger.info({ name, email, subject }, "Contact form email sent");
    res.json({ success: true });
  } catch (err) {
    logger.error({ err }, "Failed to send contact email");
    res.status(500).json({ error: "Failed to send message. Please contact us directly." });
  }
});

export default router;
