/**
 * Email Service Integration
 * Supports Resend (recommended) and SendGrid
 * Handles transactional emails: verification, password reset, notifications
 */

import { Resend } from "resend";
import { logger } from "./logger";
import { getEnv } from "./env";

// Initialize Resend client
let resendClient: Resend | null = null;

function getResendClient(): Resend | null {
  if (resendClient) {
    return resendClient;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    logger.warn(
      "RESEND_API_KEY not configured. Email functionality will be disabled.",
    );
    return null;
  }

  resendClient = new Resend(apiKey);
  return resendClient;
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
  fromName?: string;
}

/**
 * Send email using configured service (Resend)
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const client = getResendClient();
    if (!client) {
      logger.warn("Email service not configured. Email not sent.", {
        to: options.to,
        subject: options.subject,
      });
      return false;
    }

    const fromEmail =
      options.from || process.env.EMAIL_FROM || "noreply@empulsemusic.com";
    const fromName =
      options.fromName || process.env.EMAIL_FROM_NAME || "EmPulse Music";

    const result = await client.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    if (result.error) {
      logger.error("Email sending failed", result.error, {
        to: options.to,
        subject: options.subject,
      });
      return false;
    }

    logger.info("Email sent successfully", {
      to: options.to,
      subject: options.subject,
      id: result.data?.id,
    });
    return true;
  } catch (error) {
    logger.error("Email sending error", error, {
      to: options.to,
      subject: options.subject,
    });
    return false;
  }
}

/**
 * Send email verification email
 */
export async function sendVerificationEmail(
  email: string,
  verificationToken: string,
): Promise<boolean> {
  const env = getEnv();
  const appUrl =
    env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3001";
  const verificationUrl = `${appUrl}/api/auth/verify?token=${verificationToken}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .button { display: inline-block; padding: 12px 24px; background-color: #7209B7; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { margin-top: 30px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to EmPulse Music!</h1>
        <p>Thank you for signing up. Please verify your email address to activate your account.</p>
        <a href="${verificationUrl}" class="button">Verify Email Address</a>
        <p>Or copy and paste this link into your browser:</p>
        <p><a href="${verificationUrl}">${verificationUrl}</a></p>
        <p>This verification link will expire in 24 hours.</p>
        <div class="footer">
          <p>If you didn't create an account, you can safely ignore this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: "Verify your EmPulse Music account",
    html,
  });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  email: string,
  resetToken: string,
): Promise<boolean> {
  const env = getEnv();
  const appUrl =
    env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3001";
  const resetUrl = `${appUrl}/reset-password?token=${resetToken}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .button { display: inline-block; padding: 12px 24px; background-color: #7209B7; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { margin-top: 30px; font-size: 12px; color: #666; }
        .warning { background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Reset Your Password</h1>
        <p>You requested to reset your password for your EmPulse Music account.</p>
        <a href="${resetUrl}" class="button">Reset Password</a>
        <p>Or copy and paste this link into your browser:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <div class="warning">
          <p><strong>Security Notice:</strong> This password reset link will expire in 1 hour. If you didn't request a password reset, please ignore this email or contact support if you're concerned.</p>
        </div>
        <div class="footer">
          <p>If you didn't request this password reset, you can safely ignore this email. Your account remains secure.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: "Reset your EmPulse Music password",
    html,
  });
}

/**
 * Send artist application confirmation email
 */
export async function sendArtistApplicationConfirmation(
  email: string,
  artistName: string,
  applicationId: string,
): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .footer { margin-top: 30px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Artist Application Received</h1>
        <p>Hello ${artistName},</p>
        <p>Thank you for submitting your artist application to EmPulse Music!</p>
        <p>We've received your application (ID: ${applicationId}) and our team will review it shortly.</p>
        <p>You'll receive an email notification once your application has been reviewed.</p>
        <div class="footer">
          <p>Questions? Contact us at support@empulsemusic.com</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: "Your EmPulse Music Artist Application",
    html,
  });
}
