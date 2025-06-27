export default async function handler(req, res) {
  const { message } = req.body;

  const API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  try {
    const response = await fetch(`${GEMINI_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
      }),
    });

    const data = await response.json();

    console.log('[Gemini API Raw Response]', JSON.stringify(data, null, 2));

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || '⚠️ Gemini returned an empty reply.';
    res.status(200).json({ reply });
  } catch (error) {
    console.error('[Gemini API Error]', error);
    res.status(500).json({ reply: '❌ Error connecting to Gemini API.' });
  }
}
