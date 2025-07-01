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

    // Check that the event date is in the future
    const eventDate = new Date(date);
    const now = new Date();
    if (isNaN(eventDate.getTime()) || eventDate < now) {
      return new Response(JSON.stringify({ success: false, error: 'Event date must be in the future.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { error } = await supabase
      .from('events')
      .insert([{ title, venue, date, price, description, approved: false }]);

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