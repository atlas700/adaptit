<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 🧠 AGENTS.md — Adaptit AI Coding Instructions

## 1. Project Overview

This project is a SaaS web application called **Adaptit**.

Goal:
Build an AI-powered adaptive learning platform that:

- Converts any topic into structured learning paths
- Generates lessons in multiple formats (text, diagrams, video-style)
- Tracks user progress and adapts difficulty
- Supports organizations (schools, teams)

This is NOT a simple chatbot.
This is a **learning system with structure, progression, and state**.

---

## 2. Core Architecture

### Apps
- apps/web → Next.js frontend (App Router)
- apps/server → API + business logic
- packages/db → PostgreSQL database layer
- packages/ai → AI pipelines (generation + formatting)

### Stack
- Next.js (frontend + server actions)
- TypeScript (strict mode)
- PostgreSQL
- Tailwind + shadcn/ui
- Stripe (billing)
- OpenAI / AI provider (generation layer)

---

## 3. Key System Concepts

### 1. Learning Path
A structured roadmap:
- topic → modules → lessons

### 2. Lesson
Contains:
- explanation
- examples
- format (text | visual | video)

### 3. User Progress
Track:
- completed lessons
- quiz results
- weak areas

### 4. AI Pipeline
Flow:
User Input → Topic Parser → Roadmap Generator → Lesson Generator → Format Renderer

---

## 4. Coding Principles (MANDATORY)

### General Rules
- Always use TypeScript (strict)
- Prefer server components unless needed otherwise
- Keep functions pure when possible
- Avoid unnecessary abstraction
- Write readable, production-level code

### Architecture Rules
- Separate concerns (UI / logic / data)
- No business logic inside React components
- Use services layer for logic
- Use repository pattern for DB access

### Naming
- clear, explicit names
- no abbreviations
- functions = verbs
- variables = nouns

---

## 5. Frontend Rules

- Use clean, modern UI (NOT generic templates)
- Use Tailwind properly (no inline styles)
- Components must be reusable
- Avoid large monolithic components

### UX Priority
- clarity > beauty
- structured layouts
- minimal cognitive load

---

## 6. Backend Rules

- Use API routes or server actions
- Validate all inputs (Zod)
- Never trust client data
- Return consistent response format

---

## 7. Database Rules

- Use PostgreSQL directly
- Always define relations clearly
- Use indexes for performance
- Avoid deeply nested queries

### Core Tables
- users
- organizations
- learning_paths
- modules
- lessons
- progress
- subscriptions

---

## 8. AI Generation Rules

When generating content:

### MUST:
- be structured (no long raw text)
- include examples
- break into steps
- adapt to difficulty level

### NEVER:
- return vague explanations
- generate unstructured content
- ignore user level

---

## 9. Multi-Format Output Rules

### Text Mode
- concise explanation
- bullet points
- examples

### Visual Mode
- use diagrams (Mermaid when possible)

### Video Mode
- generate:
  - script
  - step-by-step explanation
  - scene breakdown

---

## 10. Code Generation Instructions

When writing code:

### ALWAYS:
- explain what you're doing briefly
- write clean and complete code
- include types
- handle edge cases

### NEVER:
- write pseudo code
- leave TODOs unless asked
- generate unused code

---

## 11. Task Execution Strategy

For complex tasks:
1. Break into smaller steps
2. Implement step-by-step
3. Validate each part
4. Then combine

---

## 12. Testing Rules

- Write testable code
- Prefer unit tests for logic
- Avoid tightly coupled components

---

## 13. Performance Guidelines

- Avoid unnecessary re-renders
- Use caching where possible
- Lazy load heavy components
- Optimize DB queries

---

## 14. Security Rules

- Validate all inputs
- Sanitize outputs
- Use secure auth flows
- Protect API routes

---

## 15. Payments (Stripe)

- Use subscription model
- Handle:
  - upgrades
  - downgrades
  - cancellations
- Sync with database

---

## 16. What to Do When Unsure

- Choose simplest working solution
- Avoid overengineering
- Ask for clarification if critical

---

## 17. What to Optimize For

- clarity
- maintainability
- scalability
- developer experience

---

## 18. Anti-Patterns (DO NOT DO)

- giant components
- deeply nested logic
- unclear naming
- duplicated code
- mixing UI and business logic

---

## 19. Output Style

- Be concise
- Avoid repetition
- Focus on useful output
- Prefer practical over theoretical

---

## 20. Final Principle

You are not just writing code.

You are building a **production-grade SaaS system** used by real users.
