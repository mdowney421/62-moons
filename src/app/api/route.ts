import { Resend } from 'resend';

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isNonEmptyString(value: unknown, maxLength: number): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { name, email, message } = (body ?? {}) as Record<string, unknown>;

  if (
    !isNonEmptyString(name, MAX_NAME_LENGTH) ||
    !isNonEmptyString(email, MAX_EMAIL_LENGTH) ||
    !isNonEmptyString(message, MAX_MESSAGE_LENGTH)
  ) {
    return Response.json({ error: 'Invalid form submission.' }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeMessage = escapeHtml(message.trim());
  const emailSubject = `New 62 Moons Inquiry from ${safeName}`;

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: 'noreply@62moonsband.com',
    to: '62moons1@gmail.com',
    replyTo: email.trim(),
    subject: emailSubject,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111;">
        <h2 style="margin: 0 0 12px;">${emailSubject}</h2>
        <p style="margin: 0 0 16px;"><strong>From:</strong> ${safeName} (${safeEmail})</p>

        <hr style="border: 0; border-top: 1px solid #ddd; margin: 16px 0;" />

        <p style="margin: 0 0 8px;"><strong>Message</strong></p>
        <div style="white-space: pre-wrap; background: #fafafa; border: 1px solid #eee; padding: 12px; border-radius: 6px;">
          ${safeMessage}
        </div>
      </div>
    `,
  });

  if (error) {
    return Response.json({ error: 'Failed to send message.' }, { status: 502 });
  }

  return Response.json({ success: true });
}
