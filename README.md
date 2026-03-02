# Next.js Foundation Template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/NWersw?referralCode=-96QSv&utm_medium=integration&utm_source=template&utm_campaign=generic)

This Next.js 16.1.6 template is designed for building scalable web applications. It implements a "Screaming Architecture" pattern and comes pre-configured with several essential tools.

## Architecture & Structure

This template diverges from the standard Next.js directory layout. Instead of grouping files by type, it groups them by **domain**.

For more details on why and how we use this, please read the [Architecture Documentation](docs/architecture.md).

## Features

- **Next.js 16.1.6** with App Router
- **Screaming Architecture** base layout
- **shadcn/ui** with Tailwind CSS v4 for UI components
- **Better Auth** setup with **MongoDB** Adapter
- **Zod** for schema validation
- Prepared for deployment on **Railway**.

## Getting Started

First, install dependencies:

```bash
npm install
```

## Configuration & Deployment

### Environment Variables

This template uses strict Zod validation for environment variables. Ensure the following are set in your environment (especially on Railway):

- `MONGODB_URI`: Your MongoDB connection string.
  - _Railway Replica Set Example:_ `mongodb://user:pass@mongo1.railway.internal:27017,mongo2.railway.internal:27017,mongo3.railway.internal:27017/db?replicaSet=rs0`
- `BETTER_AUTH_SECRET`: A secure 32+ character string. Run `npx @better-auth/cli secret` to generate one.
- `BETTER_AUTH_URL`: The public URL of your application (e.g., `https://your-app.up.railway.app`).

### Railway Deployment

1. Connect your GitHub repository to Railway.
2. Railway will automatically detect the `Dockerfile` and `railway.json`.
3. **Crucial:** Add the environment variables listed above in the Railway project dashboard under "Variables". Without these, the application will fail to start.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
