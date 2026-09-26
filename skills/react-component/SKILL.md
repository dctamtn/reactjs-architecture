---
name: react-component
description: Use when adding or changing a React component, layout, or visual state.
---

# React component

## Before creating one

Search `src/components/` and the feature's `components/` folder. Extend an existing component when it already does the job. Add a shadcn/ui primitive under `src/components/ui/` only when the screen needs that primitive. Use `cn` from `@/lib/utils` for class names. Tokens live in `src/styles/globals.css`.

## Shape

- A component renders and forwards events. It does not call `apiClient`, `fetch`, or anything in `server/`.
- Data arrives through props or a feature hook.
- Keep a component to one visible region. Split a second region into its own component instead of growing this file.
- Feature-specific UI stays in that feature. Move it to `src/components/` only when a second feature renders it.

## States

A component that depends on remote data shows a loading state, an error state, and the ready state. Do not render an empty container while a query is in flight.

## Styling

Use Tailwind utilities. Do not add a new CSS file for a single component. Do not introduce a second component library beside the shadcn primitives.
