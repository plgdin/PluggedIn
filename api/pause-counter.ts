import { kv } from '@vercel/kv';
import { VercelRequest, VercelResponse } from '@vercel/node';

// --- CONSTANTS (Must match H2OPage.tsx logic) ---
const MIN_TICK_SECONDS = 3;  
const MAX_TICK_SECONDS = 120;
const DONATION_PER_TICK = 0.10;
const AVG_INTERVAL_SECONDS = (MIN_TICK_SECONDS + MAX_TICK_SECONDS) / 2; // 61.5s
const RATE_PER_SECOND = DONATION_PER_TICK / AVG_INTERVAL_SECONDS;
// --- END CONSTANTS ---

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    // 1. Fetch current counter state from DB
    const base_amount_db = await kv.get('donation_base_amount') as number;
    const start_timestamp_db = await kv.get('donation_start_timestamp') as number;

    if (base_amount_db === null || start_timestamp_db === null) {
      return response.status(400).json({ error: 'Counter is not running or not initialized.' });
    }

    const now = Date.now();
    const elapsedSeconds = (now - start_timestamp_db) / 1000;
    
    // 2. Calculate the FINAL current amount
    const earnedDonations = elapsedSeconds * RATE_PER_SECOND;
    const finalPausedAmount = parseFloat((base_amount_db + earnedDonations).toFixed(2));

    // 3. Update the database to lock the counter at the final amount
    // We set the base_amount to the final amount, and reset the start_timestamp to NOW.
    // This makes elapsed time = 0, effectively stopping the timer.
    await kv.set('donation_base_amount', finalPausedAmount);
    await kv.set('donation_start_timestamp', now);

    return response.status(200).json({ 
      message: 'Counter successfully paused.',
      final_paused_amount: finalPausedAmount,
      timestamp_of_pause: now
    });
  } catch (error) {
    console.error("Pause Counter Error:", error);
    return response.status(500).json({ error: 'Failed to pause counter.' });
  }
}