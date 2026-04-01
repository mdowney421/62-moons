import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  await resend.emails.send({
    from: 'noreply@62moonsband.com',
    to: 'mattdowney421@gmail.com',
    subject: `New 62 Moons inquiry from ${name}`,
    html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`
  });

  return Response.json({ success: true });
}