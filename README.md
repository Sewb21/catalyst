# Catalyst

Fullstack monorepo using **Bun**, **React 19**, **Vite**, **TanStack Router/Query**, **Tailwind CSS v4**, and **bun:sqlite**.

## Project Structure

```
apps/
├── server/
│   ├── api/index.ts        # Bun.serve() entry point (port 3000)
│   ├── db.ts               # SQLite connection (WAL mode, foreign keys)
│   ├── routes/hello.ts     # Example route handler
│   └── seed/index.ts       # DB seed script
└── web/
    ├── index.html
    ├── vite.config.ts
    ├── components.json      # shadcn config
    └── src/
        ├── main.tsx
        ├── App.tsx          # QueryClient + Router
        ├── router.tsx       # TanStack Router setup
        ├── index.css        # Tailwind + CSS variables
        ├── lib/
        │   ├── api.ts       # API URL config + fetch helper
        │   ├── utils.ts     # cn() helper
        │   └── hooks/data/  # TanStack Query hooks
        └── routes/
            ├── __root.tsx   # Root layout
            └── index.tsx    # Home page
```

## Getting Started

```bash
# Install dependencies
bun install

# Seed the database
bun server:seed

# Start the server (port 3000, hot reload)
bun server:dev

# Start the web app (Vite dev server, port 5173)
bun web:dev
```

## API URL Configuration

The frontend reads `VITE_API_URL` to know where the server lives. Defaults to `http://localhost:3000`.

```bash
# .env in apps/web/
VITE_API_URL=http://localhost:3000
```

Use `apiFetch` or `apiUrl` from `@/lib/api` for all server requests.

## Adding shadcn Components

```bash
cd apps/web && bunx shadcn@latest add button card input
```

## Conventions

- **Runtime**: Bun everywhere — no Node, no Express
- **DB**: `bun:sqlite` with WAL mode and foreign keys
- **Server**: `Bun.serve()` with route map and `withCors` wrapper
- **Frontend**: React 19 + Vite + TanStack Router (file-based) + TanStack Query
- **Styling**: Tailwind CSS v4 + shadcn (base-nova style, tabler icons)
- **Path alias**: `@/` maps to `src/` in the web app
- **Formatting**: Prettier — single quotes, trailing commas, 100 char width
