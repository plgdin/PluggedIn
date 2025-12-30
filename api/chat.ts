import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const hfToken = process.env.HF_TOKEN;
  if (!hfToken) {
    return res.status(500).json({ error: 'API token not configured' });
  }

  // UPDATED: Switched to a faster model to prevent timeouts
  const modelUrl = "https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct";

  try {
    const response = await fetch(modelUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${hfToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // UPDATED: Using the correct prompt format for the Phi-3 model
        inputs: `<|user|>\n${message}<|end|>\n<|assistant|>`,
        parameters: {
          max_new_tokens: 250,
          return_full_text: false,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hugging Face API Error:', errorText);
      return res.status(response.status).json({ error: 'Failed to get response from AI.' });
    }

    const data = await response.json();
    const botResponse = data[0]?.generated_text || "Sorry, I couldn't process that.";

    res.status(200).json({ reply: botResponse.trim() });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}