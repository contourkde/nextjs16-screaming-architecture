# Next.js Foundation Template

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

Copy the example environment variables:

```bash
cp .env.example .env
```

Set your `MONGODB_URI` and `BETTER_AUTH_SECRET` in `.env`.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
