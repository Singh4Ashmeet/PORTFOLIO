import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
export const runtime = "nodejs";

type RateEntry = {
  count: number;
  resetAt: number;
};

type SendGridError = Error & {
  code?: number;
  response?: {
    statusCode?: number;
    body?: unknown;
  };
};

const rateLimit = new Map<string, RateEntry>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_SUBMISSIONS = 3;

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const current = rateLimit.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (current.count >= MAX_SUBMISSIONS) {
    return false;
  }

  current.count += 1;
  rateLimit.set(ip, current);
  return true;
}

function clean(value: unknown) {
  return validator.trim(validator.stripLow(String(value ?? "")));
}

function logMailError(error: unknown) {
  const mailError = error as SendGridError;
  console.error("Contact email send failed", {
    message: mailError?.message,
    code: mailError?.code,
    statusCode: mailError?.response?.statusCode,
    body: mailError?.response?.body,
  });
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;

  if (!body) {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (clean(body.website)) {
    return NextResponse.json({ success: true });
  }

  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 },
    );
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const subject = clean(body.subject);
  const message = clean(body.message);

  if (!validator.isLength(name, { min: 2, max: 100 })) {
    return NextResponse.json(
      { error: "Name must be between 2 and 100 characters." },
      { status: 400 },
    );
  }

  if (!validator.isEmail(email) || !validator.isLength(email, { max: 160 })) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (!validator.isLength(subject, { min: 2, max: 120 })) {
    return NextResponse.json(
      { error: "Subject must be between 2 and 120 characters." },
      { status: 400 },
    );
  }

  if (!validator.isLength(message, { min: 20, max: 3000 })) {
    return NextResponse.json(
      { error: "Message must be between 20 and 3000 characters." },
      { status: 400 },
    );
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!apiKey || !contactEmail) {
    return NextResponse.json(
      { error: "Contact service is not configured." },
      { status: 503 },
    );
  }

  const safeName = validator.escape(name);
  const safeSubject = validator.escape(subject);
  const safeMessage = validator.escape(message).replace(/\n/g, "<br />");

  try {
    const sgMail = (await import("@sendgrid/mail")).default;
    sgMail.setApiKey(apiKey);

    await sgMail.send({
      to: contactEmail,
      from: contactEmail,
      replyTo: email,
      subject: `Portfolio contact: ${safeSubject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${validator.escape(
        email,
      )}</p><p><strong>Subject:</strong> ${safeSubject}</p><p>${safeMessage}</p>`,
    });
  } catch (error) {
    logMailError(error);

    return NextResponse.json(
      {
        error:
          "Message could not be sent right now. Please use the direct email link below.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
