
export default async function handler(req, res) {
  const { message } = req.body;

  const API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/chat-bison-001:generateMessage`;

  try {
    const response = await fetch(`${GEMINI_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: {
          messages: [
            {
              author: 'user',
              content: message,
            },
          ],
        },
        temperature: 0.7,
        candidateCount: 1,
      }),
    });

    const data = await response.json();

    const reply = data?.candidates?.[0]?.content || '[❓ Gemini raw response]:\n' + JSON.stringify(data);
    res.status(200).json({ reply });
  } catch (error) {
    console.error('[Gemini Error]', error);
    res.status(500).json({ reply: '❌ Gemini API request failed.' });
  }
}
