import { AppProviders } from "@/app/providers";
import { AppShell } from "@/components/layout";

export function App() {
  return (
    <AppProviders>
      <AppShell />
    </AppProviders>
  );
}
