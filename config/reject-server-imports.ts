import path from "node:path";
import type { Plugin } from "vite";

function isInside(file: string, rootDir: string): boolean {
  const relative = path.relative(rootDir, file);
  return (
    relative === "" ||
    (!relative.startsWith("..") && !path.isAbsolute(relative))
  );
}

export function rejectServerImports(roots: {
  browserRoot: string;
  serverRoot: string;
}): Plugin {
  return {
    name: "reject-server-imports",
    enforce: "pre",
    async resolveId(source, importer, options) {
      if (!importer) {
        return null;
      }

      const importerFile = path.normalize(importer.split("?")[0] ?? importer);
      if (!isInside(importerFile, roots.browserRoot)) {
        return null;
      }

      const specifier = source.split("?")[0]?.replaceAll("\\", "/") ?? source;
      if (!/(?:^|\/)server(?:\/|$)/.test(specifier)) {
        return null;
      }

      const resolved = await this.resolve(source, importer, {
        ...options,
        skipSelf: true,
      });
      if (!resolved || resolved.external) {
        return null;
      }

      const resolvedFile = path.normalize(
        resolved.id.split("?")[0] ?? resolved.id,
      );
      if (isInside(resolvedFile, roots.serverRoot)) {
        this.error(
          `Browser code cannot import server module "${source}". Call the app API instead.`,
        );
      }

      return null;
    },
  };
}
