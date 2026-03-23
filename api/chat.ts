import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const backendUrl = process.env.BACKEND_URL;
  const frontendSecret = process.env.FRONTEND_SECRET;

  if (!backendUrl || !frontendSecret) {
    console.error('Missing env vars:', { backendUrl: !!backendUrl, frontendSecret: !!frontendSecret });
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  const response = await fetch(`${backendUrl}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Frontend-Secret': frontendSecret,
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.json();
  return res.status(response.status).json(data);
}
