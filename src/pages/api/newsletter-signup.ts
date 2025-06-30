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
    const baseUrl = import.meta.env.SITE_URL || 'https://your-site.netlify.app';
    const confirmLink = `${baseUrl}/confirm-newsletter?id=${token}`;

    // Send confirmation email
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Confirm your subscription',
      html: `<p>Click <a href="${confirmLink}">here to confirm your subscription</a>.</p>`,
    });

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