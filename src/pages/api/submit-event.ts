import type { APIRoute } from 'astro';
import pb from '../../lib/pocketbase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    // Use exact field names/casing as in PocketBase, including Price
    const record = await pb.collection('events').create({
      Title: data.title,
      Venue: data.venue,
      Date: data.date,
      Price: data.price,
      Description: data.description,
      Status: 'pending',
    });
    return new Response(JSON.stringify({ success: true, record }), {
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