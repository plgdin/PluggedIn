import { kv } from '@vercel/kv';
import { VercelRequest, VercelResponse } from '@vercel/node';

// --- CONTROLS ---
// Set your starting donation amount here
const INITIAL_DONATION_AMOUNT = 5773.48;
// ---

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    // Set the base amount
    await kv.set('donation_base_amount', INITIAL_DONATION_AMOUNT);
    
    // Set the start time to RIGHT NOW
    const startTime = Date.now();
    await kv.set('donation_start_timestamp', startTime);

    return response.status(200).json({ 
      message: 'Counter started successfully.',
      base_amount: INITIAL_DONATION_AMOUNT,
      start_timestamp: startTime
    });
  } catch (error) {
    console.error('Failed to start counter:', error);
    return response.status(500).json({ error: 'Failed to start counter' });
  }
}