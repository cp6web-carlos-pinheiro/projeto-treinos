# Treinos

## Overview
A simple TypeScript/Node.js project. Currently contains a minimal entry point (`src/index.ts`) that logs "Hello God!" to the console.

## Project Structure
- `src/index.ts` - Main entry point
- `tsconfig.json` - TypeScript configuration (target: ES2024, module: nodenext)
- `package.json` - Project manifest with `npm run dev` script using `tsx --watch`

## Tech Stack
- Runtime: Node.js 20
- Language: TypeScript 5.x
- Dev runner: tsx (TypeScript execution with watch mode)

## Workflow
- **Start application**: `npm run dev` — runs `tsx --watch src/index.ts` (console output)
