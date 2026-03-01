# Finance Insight

React + Express portfolio app with a MongoDB-backed contact endpoint.

## Prerequisites

- Node.js 20+
- MongoDB Atlas connection string

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env
```

3. Set `MONGODB_URI` in `.env`.

4. Start dev server:

```bash
npm run dev
```

## Production build

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Add `MONGODB_URI` in Vercel Project Settings -> Environment Variables.
4. Deploy.
