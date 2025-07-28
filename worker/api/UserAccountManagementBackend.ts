import { handleUserSignup, handleUserLogin } from '../../functions/api/userHandlers';

export async function UserAccountManagementBackendHandler(req: Request): Promise<Response> {
  try {
    const { method, url } = req;
    const urlPath = new URL(url).pathname;

    if (method === 'POST' && urlPath === '/signup') {
      return await handleUserSignup(req);
    } else if (method === 'POST' && urlPath === '/login') {
      return await handleUserLogin(req);
    } else {
      return new Response(JSON.stringify({ error: 'Not Found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
