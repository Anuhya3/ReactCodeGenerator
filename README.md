# AI Website to React Converter

Production-ready full-stack app that converts any website URL into reusable React components using AI.

## Project structure

```
backend/
  controllers/
  graphql/
    schema.js
    resolvers.js
  middlewares/
  prisma/
    schema.prisma
  routes/
  services/
  utils/
  server.js
frontend/
  src/
    app/
    components/
    hooks/
    services/
    store/
    utils/
```

## GraphQL API

Endpoint: `http://localhost:4000/graphql`

Queries
- `health`
- `job(id: ID!)`

Mutations
- `generateFromUrl(url: String!)`
- `generateFromHtml(html: String!)`

Schema lives in `backend/graphql/schema.js`.

## Example AI prompt

System:
```
You are a senior frontend engineer. Convert HTML into reusable React functional components using Tailwind CSS.
Return STRICT JSON with keys: componentTree (string), components (array of {name, description}), code (string TSX), previewHtml (string), notes (string).
```

User:
```
Convert this HTML into reusable React components with Tailwind.

HTML:
<html>...</html>
```

## Environment variables

Backend: `backend/.env`
```
PORT=4000
CORS_ORIGIN=http://localhost:3000
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4.1-mini
```

Frontend: `frontend/.env`
```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_WS_URL=ws://localhost:4000/ws
```

## Run locally

1. Backend
```
cd backend
npm install
npm run dev
```

2. Frontend
```
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Notes

- WebSocket updates are available at `/ws`.
- Export ZIP is available at `/export/:jobId` when a job completes.
- Prisma schema is included for PostgreSQL; optional setup.
