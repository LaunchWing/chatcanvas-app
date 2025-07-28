interface UserData {
  username: string;
  password: string;
}

async function parseRequestBody(req: Request): Promise<UserData> {
  try {
    const contentType = req.headers.get('Content-Type') || '';
    if (contentType.includes('application/json')) {
      return await req.json();
    }
    throw new Error('Invalid content type');
  } catch (error) {
    throw new Error('Invalid request body');
  }
}

export async function handleUserSignup(req: Request): Promise<Response> {
  try {
    const userData: UserData = await parseRequestBody(req);
    if (!userData.username || !userData.password) {
      return new Response(JSON.stringify({ error: 'Missing username or password' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    // Add logic to save user to database
    return new Response(JSON.stringify({ message: 'User signed up successfully' }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function handleUserLogin(req: Request): Promise<Response> {
  try {
    const userData: UserData = await parseRequestBody(req);
    if (!userData.username || !userData.password) {
      return new Response(JSON.stringify({ error: 'Missing username or password' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    // Add logic to authenticate user
    return new Response(JSON.stringify({ message: 'User logged in successfully' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}
