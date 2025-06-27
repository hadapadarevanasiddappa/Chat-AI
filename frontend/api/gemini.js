export default async function handler(req, res) {
  const { message } = req.body;

  const API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta2/projects/gen-lang-client-0393403660/locations/us-central1/publishers/google/models/text-bison-001:predict';

  try {
    const response = await fetch(`${GEMINI_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [{ prompt: message }],
        parameters: {
          temperature: 0.7,
          maxOutputTokens: 256,
        },
      }),
    });

    const data = await response.json();
    const reply =
      data?.predictions?.[0]?.content ||
      `[❓ Gemini raw response]:\n${JSON.stringify(data, null, 2)}`;

    res.status(200).json({ reply });
  } catch (error) {
    console.error('[Gemini Error]', error);
    res.status(500).json({ reply: '❌ Gemini API request failed.' });
  }
}
