import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  await resend.emails.send({
    from: 'contact@62moonsband.com', // Probably need to change this once domain is set up
    to: 'example@gmail.com', // Need to test this with personal email before setting up band email
    subject: `New 62 Moons inquiry from ${name}`,
    html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`
  });

  return Response.json({ success: true });
}