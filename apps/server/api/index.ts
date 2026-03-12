import { hello } from '../routes/hello';
import db from '../db';
import { getBearerToken, jwtVerify, type AuthUser } from '../utils/auth';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function withCors(handler: (req: Request) => Response | Promise<Response>) {
  return async (req: Request) => {
    const res = await handler(req);
    const headers = new Headers(res.headers);
    for (const [k, v] of Object.entries(CORS_HEADERS)) headers.set(k, v);
    return new Response(res.body, { status: res.status, headers });
  };
}

function withAuth(handler: (req: Request) => Response | Promise<Response>) {
  return async (req: Request) => {
    const token = getBearerToken(req);
    if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const payload = await jwtVerify(token);
    if (!payload) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    return handler(req);
  };
}

function withAuthContext(handler: (req: Request, user: AuthUser) => Response | Promise<Response>) {
  return async (req: Request) => {
    const token = getBearerToken(req);
    if (!token) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const payload = await jwtVerify(token);
    if (!payload) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const user = db
      .query('SELECT id, name, email FROM users WHERE id = ?')
      .get(payload.sub as string) as AuthUser | null;
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    return handler(req, user);
  };
}

const server = Bun.serve({
  port: 3000,
  routes: {
    '/api/hello': { GET: withCors(hello) },
    // Add more routes here:
    // '/api/things': { GET: withCors(withAuth(listThings)) },
  },
  fetch(req) {
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }
    return new Response('Not Found', { status: 404 });
  },
  development: true,
});

console.log(`Server running on ${server.url}`);
