import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY
);

export const GET: APIRoute = async ({ url }) => {
  const token = url.searchParams.get('token');
  if (!token) {
    return new Response('Invalid confirmation link.', { status: 400 });
  }

  try {
    // Find the record by token
    const { data, error } = await supabase
      .from('newsletter_signups')
      .select('*')
      .eq('token', token)
      .single();

    if (error || !data) {
      return new Response('Invalid or expired confirmation link.', { status: 400 });
    }

    // Mark as confirmed
    const { error: updateError } = await supabase
      .from('newsletter_signups')
      .update({ confirmed: true })
      .eq('token', token);

    if (updateError) throw updateError;

    // Insert into confirmed list
    await supabase
      .from('newsletter_confirmed')
      .insert([{ email: data.email }]);

    // Add to Resend audience
    const resend = new Resend(import.meta.env.RESEND_API_KEY);
    await resend.contacts.create({
      email: data.email,
      audienceId: 'e9326a5c-27fb-4d64-8f82-ea3e0d1cb74c',
    });

    return new Response('Your subscription is confirmed! You may close this page.', {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (err: any) {
    return new Response('Error confirming subscription.', { status: 500 });
  }
}; 