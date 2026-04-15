# Adaptit Implementation Status

This file tracks what is already implemented in the repository, what should be built next, and what is still pending.

## Working Rule

Feature work should be scoped to a single manageable implementation slice per planning/execution cycle.
Do not combine multiple large systems in one pass.

## Implemented

### Foundation

- Root Next.js 16 app is set up and builds successfully.
- Shared PostgreSQL + Drizzle package exists in `packages/db`.
- Base schema exists for:
  - users
  - organizations
  - organization memberships
  - workspaces
  - subscriptions
  - learning paths
  - modules
  - lessons
  - lesson progress
  - quiz attempts

### Design System

- `shadcn/ui` initialized in the root app.
- Core UI primitives installed:
  - button
  - input
  - textarea
  - label
  - select
  - card
  - dialog
  - dropdown-menu
  - separator
  - badge
  - skeleton
  - sidebar
- Shared `cn()` helper added.
- Global semantic theme tokens added in `src/app/globals.css`.
- Root layout updated with product metadata, fonts, and `TooltipProvider`.

### UI Shell

- Starter home page replaced with a dashboard-style placeholder.
- Reusable dashboard shell added.
- Placeholder create-learning-path dialog added for UI validation.

## Next Recommended Slice

### Learning Path Dashboard

Build the first real product feature on top of the current shell:

- workspace-scoped learning path list
- create learning path form with Zod validation
- repository layer for learning paths
- service layer for learning path creation/listing
- server action or route handler for create flow
- persist records to PostgreSQL through `@adaptit/db`

## Not Implemented Yet

### Product Logic

- repository layer
- service layer
- current workspace resolver
- real server actions / route handlers for product flows

### Learning System

- module creation and editing
- lesson creation and rendering
- progress update flows
- quiz flows

### Platform Systems

- authentication
- organization/workspace switching
- billing integration
- AI generation pipeline

## Notes

- Keep future work incremental and decision-light.
- Prefer finishing one real vertical slice before opening the next subsystem.
