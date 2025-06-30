import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

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

    return new Response('Your subscription is confirmed! You may close this page.', {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (err: any) {
    return new Response('Error confirming subscription.', { status: 500 });
  }
}; 