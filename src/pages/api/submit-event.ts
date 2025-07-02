import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { generateHydrateScript } from 'astro/dist/runtime/server/hydration';

const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY
);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    // Adjust field names to match your Supabase table
    const { title, venue, date, price, genre } = data;

    // Check that the event date is in the future
    const [year, month, day] = date.split('-');
    const eventDate = new Date(Number(year), Number(month) - 1, Number(day));
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set to start of today
    if (isNaN(eventDate.getTime()) || eventDate < now) {
      return new Response(JSON.stringify({ success: false, error: 'Event date must be in the future.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Generate slug from title, venue, and date
    function slugify(str) {
      return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }
    const slug = `${slugify(title)}-at-${slugify(venue)}-${date}`;

    const { error } = await supabase
      .from('events')
      .insert([{ title, venue, date, price, genre, slug, approved: false }]);

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