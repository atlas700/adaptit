# Adaptit

Adaptit is an open-source AI-powered adaptive learning platform.

The product goal is to turn a topic into a structured learning experience with learning paths, modules, lessons, progress tracking, and organization support. This repository is still early in development, so the codebase currently contains the web app foundation and the first PostgreSQL + Drizzle database package.

## What Exists Today

- Next.js app in [`src/app`](./src/app)
- Shared database package in [`packages/db`](./packages/db)
- Drizzle config in [`drizzle.config.ts`](./drizzle.config.ts)
- Initial PostgreSQL schema and migration for:
  - users
  - organizations
  - organization memberships
  - workspaces
  - subscriptions
  - learning paths
  - learning modules
  - lessons
  - lesson progress
  - quiz attempts

## Intended Architecture

The long-term architecture described in [`AGENTS.md`](./AGENTS.md) is:

- `apps/web` for the frontend
- `apps/server` for API and business logic
- `packages/db` for the database layer
- `packages/ai` for AI generation pipelines

The repository is not fully split into those directories yet. Right now, the Next.js app lives in `src/`, and the database layer already lives in `packages/db`.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- PostgreSQL
- Drizzle ORM
- Tailwind CSS
- Planned UI direction: `shadcn/ui`

## Repository Structure

```text
adaptit/
├─ src/
│  └─ app/                  # Next.js App Router entrypoint
├─ packages/
│  └─ db/
│     ├─ drizzle/           # Generated SQL migrations + metadata
│     └─ src/
│        ├─ client.ts       # Drizzle/Postgres client
│        ├─ env.ts          # DATABASE_URL handling
│        ├─ index.ts        # package exports
│        └─ schema/         # schema modules + relations
├─ drizzle.config.ts        # Drizzle CLI configuration
├─ AGENTS.md                # project architecture and coding rules
└─ README.md
```

## Database Layout

The base schema is organized by concern instead of one giant file:

- [`packages/db/src/schema/tenancy.ts`](./packages/db/src/schema/tenancy.ts)
  - users, organizations, memberships, workspaces
- [`packages/db/src/schema/auth.ts`](./packages/db/src/schema/auth.ts)
  - accounts, sessions, verification tokens
- [`packages/db/src/schema/billing.ts`](./packages/db/src/schema/billing.ts)
  - workspace subscriptions
- [`packages/db/src/schema/learning.ts`](./packages/db/src/schema/learning.ts)
  - learning paths, modules, lessons
- [`packages/db/src/schema/progress.ts`](./packages/db/src/schema/progress.ts)
  - lesson progress, quiz attempts
- [`packages/db/src/schema/relations.ts`](./packages/db/src/schema/relations.ts)
  - Drizzle relations across the schema

The ownership model uses `workspaces` as the main boundary so the product can support both:

- personal workspaces
- organization-backed workspaces

That avoids tying app data directly to only users or only organizations.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create your local environment file

Use the example file as the starting point:

```bash
cp .env.example .env
```

If you are on Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Then set `DATABASE_URL` to a working PostgreSQL connection string.

### 3. Generate or apply the database schema

Available commands:

```bash
npm run db:generate
npm run db:push
npm run db:migrate
npm run db:studio
```

Recommended local flow:

1. Update schema files in `packages/db/src/schema`
2. Run `npm run db:generate`
3. Apply changes with `npm run db:push` for local development
4. Use `npm run db:migrate` when running migrations in a migration-based environment

### 4. Start the app

```bash
npm run dev
```

### 5. Run checks

```bash
npm run lint
npm run build
```

## Contribution Guide

### General expectations

- Keep TypeScript strict and explicit
- Prefer simple, readable solutions over clever abstractions
- Separate UI, logic, and data access
- Do not put business logic inside React components
- Use repositories/services for database-backed logic

### Before opening a PR

- Make sure the app builds
- Make sure lint passes
- If you changed the schema, include the generated migration files
- Keep changes scoped to one feature or one concern when possible

### For database changes

When changing the database:

1. Edit the relevant files in [`packages/db/src/schema`](./packages/db/src/schema)
2. Regenerate migrations with `npm run db:generate`
3. Review the generated SQL in [`packages/db/drizzle`](./packages/db/drizzle)
4. Include both schema code and generated migration files in your commit

### For application features

A good implementation order for contributors is:

1. define or extend the schema only when the feature needs it
2. add the data access layer
3. add business logic
4. add UI last

This keeps the codebase easier to review and prevents speculative schema design.

## Project Rules

Read [`AGENTS.md`](./AGENTS.md) before making substantial changes. It documents the product direction and coding expectations, including:

- architecture rules
- database guidance
- frontend rules
- backend validation requirements
- AI generation constraints

One important repo rule: this project uses a newer Next.js version with breaking changes, so contributors should check the relevant docs in `node_modules/next/dist/docs/` before making framework-specific changes.

## Current Status

This repository is in the foundation stage.

What is already in place:

- Next.js app scaffold
- PostgreSQL + Drizzle package
- initial multi-tenant learning schema

What still needs to be built:

- real feature pages and flows
- auth integration
- repository and service layers
- billing integration
- AI generation pipeline
- `shadcn/ui` component setup

## License

No license file is present yet. If you want outside contributors to use, modify, and redistribute the project clearly, add an explicit open-source license to the repository.
