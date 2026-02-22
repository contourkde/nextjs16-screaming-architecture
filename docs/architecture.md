# Architecture Overview

This Next.js foundation template follows principles of **Screaming Architecture**, a variation of Domain-Driven Design (DDD).

## What is Screaming Architecture?

When you look at the top-level directory structure of a project, it should "scream" what the application _is_, rather than what framework it's built on.

In a default Next.js project, the structure tells you "I am a Next.js application" because everything is organized by framework concepts (`app`, `components`, `lib`, etc.).
With Screaming Architecture, the structure tells you "I am a healthcare system" or "I am an e-commerce platform" by grouping code into domain-specific modules.

## Directory Structure

In this template, we enforce the following separation of concerns:

```
src/
├── app/                  # Framework Layer: STRICTLY Next.js routing (pages, layouts, api routes)
├── core/                 # Shared Layer: Global UI, shared utilities, database connections
│   ├── components/ui/    # shadcn-ui components
│   ├── lib/              # Shared pure capabilities
│   └── database/         # Database connection logic
├── modules/              # Domain Layer: Feature-specific business logic and components
│   ├── auth/             # Authentication Domain
│   └── (other domains)/  # Other Domains
```

## Rules and Guidelines

1. **The `app` folder should be thin**: It should mostly contain routing configurations that import page components from `modules`. It should _not_ contain heavy business logic.
2. **Modules are independent**: A module (e.g., `auth`) should encapsulate all its related UI components, server actions, and schemas.
3. **Use path aliases**: Always use absolute imports like `@core/components/ui/button` or `@modules/auth/components/LoginForm` to maintain clean dependency trees.
