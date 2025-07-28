export async function handleOpenAIRequest(prompt: string): Promise<Response> {
  const openAIEndpoint = 'https://api.openai.com/v1/chat/completions';
  const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your actual OpenAI API key

  try {
    const openAIResponse = await fetch(openAIEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!openAIResponse.ok) {
      const errorText = await openAIResponse.text();
      return new Response(JSON.stringify({ error: 'OpenAI API Error', details: errorText }), {
        status: openAIResponse.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const openAIData = await openAIResponse.json();
    return new Response(JSON.stringify(openAIData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch from OpenAI API' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}