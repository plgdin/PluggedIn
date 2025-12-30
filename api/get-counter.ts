import { kv } from '@vercel/kv';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    // Fetch both values from the database
    const base_amount = await kv.get('donation_base_amount');
    const start_timestamp = await kv.get('donation_start_timestamp');

    return response.status(200).json({ base_amount, start_timestamp });
  } catch (error) {
    console.error('Failed to fetch counter data:', error);
    return response.status(500).json({ error: 'Failed to fetch counter data' });
  }
}