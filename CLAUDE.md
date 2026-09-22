# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

"Trivia Break" is browser-based, multiplayer trivia game. Players join a room, answer questions, and compete for the
highest score. The game is designed to be played in short bursts, making it ideal for office breaks or casual gaming sessions.

## Repository layout

npm **workspaces** (root `package.json`), two packages plus a root `client/tsconfig.json` that project-references both:

- **`server/` (`@trivia-break/server`)** — Fastify app, game engine (`server/src/game`), DB layer (`server/src/db`), WS
  handlers (`server/src/ws`), REST routes (`server/src/routes`). `nodenext`, **emits** to `server/dist`.
- **`client/` (`@trivia-break/client`)** — Lit + Vite SPA, bundler-mode, `noEmit`. Vite builds it to `client/dist`.

## Before every commit

**Always run lint and the unit tests from the repo root, and only commit if both pass:**

```bash
npm run lint     # eslint . — must be clean, no errors
npm test         # vitest run — must pass (non-interactive, not watch mode)
```

Fix any failures before committing rather than committing around them. Do not commit with a failing or skipped lint/test step.

## Pull requests

- **Cap each feature PR at 25 changed files.** Keep pull requests small enough for a manageable review — if a feature would touch more than 25 files, split it into multiple PRs. Check with `git diff --name-only main | wc -l` before opening one.
