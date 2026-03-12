export function hello(_req: Request) {
  return Response.json({ message: 'Hello from Bun!' });
}
