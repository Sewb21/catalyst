import { hello } from '../routes/hello';

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

const server = Bun.serve({
  port: 3000,
  routes: {
    '/api/hello': { GET: withCors(hello) },
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
