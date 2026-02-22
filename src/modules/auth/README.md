# Authentication Domain (`src/modules/auth`)

This module encapsulates all logic, UI components, schemas, and configurations related to User Authentication.

## Purpose

By keeping authentication isolated in this module, we adhere to the Screaming Architecture pattern. It ensures that any changes to auth logic (like switching providers or updating auth schemas) are contained here without sprawling across the entire application.

## Structure

- `components/` - UI components specific to authentication (e.g., Login forms, Register forms)
- `actions.ts` - Server actions for auth operations
- `schema.ts` - Zod validations and Database types related to users/auth
