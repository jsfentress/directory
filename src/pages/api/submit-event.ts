import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY
);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    // Adjust field names to match your Supabase table
    const { title, venue, date, price, description } = data;

    const { error } = await supabase
      .from('events')
      .insert([{ title, venue, date, price, description, status: 'pending' }]);

    if (error) throw error;

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