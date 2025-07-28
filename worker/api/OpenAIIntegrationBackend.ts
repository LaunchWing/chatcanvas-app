import { handleOpenAIRequest } from '../../functions/api/handleOpenAIRequest';

export async function OpenAIIntegrationBackendHandler(req: Request): Promise<Response> {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const contentType = req.headers.get('Content-Type');
    if (!contentType || contentType !== 'application/json') {
      return new Response(JSON.stringify({ error: 'Invalid Content-Type' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const requestBody = await req.json();
    if (!requestBody.prompt || typeof requestBody.prompt !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid input: prompt is required and must be a string' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return await handleOpenAIRequest(requestBody.prompt);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}