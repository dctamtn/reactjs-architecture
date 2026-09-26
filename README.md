# Costing assistant

Browser app for a costing chatbot. AI providers, prompts, tools, and workflows live in `server/` and are not part of the Vite bundle.

Read [AGENTS.md](./AGENTS.md) before changing architecture or adding a feature. Chat and costing behavior are not implemented yet.

```powershell
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
```

Provider secrets belong in the server process. Only `VITE_` variables are visible to the browser. `VITE_API_BASE_URL` is optional and must start with `http` when set.
