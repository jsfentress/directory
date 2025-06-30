import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY
);
const resend = new Resend(import.meta.env.RESEND_API_KEY);

function generateToken() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();
    if (!email) throw new Error('Email is required');

    const token = generateToken();

    // Save to Supabase as unconfirmed
    const { error } = await supabase
      .from('newsletter_signups')
      .insert([{ email, confirmed: false, token }]);
    if (error) throw error;

    // Build confirmation link
    const baseUrl = import.meta.env.SITE_URL || 'https://nashvillesetlist.com';
    const confirmLink = `${baseUrl}/confirm-newsletter?token=${token}`;

    console.log("About to send email to:", email);
    try {
      await resend.emails.send({
        from: 'Nashville Setlist newsletter@nashvillesetlist.com',
        to: email,
        subject: 'Welcome to Nashville Setlist! Please Confirm Your Subscription',
        html: `
          <h2>Welcome to Nashville Setlist!</h2>
          <p>Thank you for signing up for our newsletter.</p>
          <p>To confirm your subscription, please click the link below:</p>
          <p><a href="${confirmLink}">Confirm My Subscription</a></p>
          <p>If you did not sign up, you can safely ignore this email.</p>
          <br>
          <p>— The Nashville Setlist Team</p>
        `,
      });
      console.log("Email send attempted for:", email);
    } catch (err) {
      console.error("Resend error for", email, err);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message || 'Unknown error' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}; 