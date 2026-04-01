import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  const emailSubject = `New 62 Moons Inquiry from ${name}`;

  await resend.emails.send({
    from: 'noreply@62moonsband.com',
    to: 'mattdowney421@gmail.com',
    subject: emailSubject,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111;">
        <h2 style="margin: 0 0 12px;">${emailSubject}</h2>
        <p style="margin: 0 0 16px;"><strong>From:</strong> ${name} (${email})</p>

        <hr style="border: 0; border-top: 1px solid #ddd; margin: 16px 0;" />

        <p style="margin: 0 0 8px;"><strong>Message</strong></p>
        <div style="white-space: pre-wrap; background: #fafafa; border: 1px solid #eee; padding: 12px; border-radius: 6px;">
          ${message}
        </div>
      </div>
    `
  });

  return Response.json({ success: true });
}