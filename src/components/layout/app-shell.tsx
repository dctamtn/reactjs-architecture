export function AppShell() {
  return (
    <main className="mx-auto flex min-h-svh max-w-2xl flex-col justify-center gap-3 px-6">
      <p className="text-sm text-muted-foreground">Architecture</p>
      <h1 className="text-3xl font-semibold tracking-tight">Costing assistant</h1>
      <p className="leading-relaxed text-muted-foreground">
        The browser app and the server-side AI boundary are in place. Chat and
        costing behavior stay unimplemented until you confirm that feature.
      </p>
    </main>
  );
}
