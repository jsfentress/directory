import type { APIRoute } from 'astro';
import pb from '../../lib/pocketbase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();
    if (!email) throw new Error('Email is required');

    // Save to PocketBase
    const record = await pb.collection('newsletter_signups').create({ email });

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