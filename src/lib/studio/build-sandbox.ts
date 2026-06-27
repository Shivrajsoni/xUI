import type { RegistryItem, SandboxBundle } from "./types";
import { SANDBOX_TAILWIND_CSS } from "./sandbox-theme";

// Pinned versions for deps the components actually import. Sandpack fetches
// these from its CDN bundler (no cost to us). Keep in sync with package.json.
const DEP_VERSIONS: Record<string, string> = {
  "lucide-react": "^0.508.0",
  "framer-motion": "12.10.1",
  motion: "12.10.1",
  clsx: "^2.1.1",
  "tailwind-merge": "^3.2.0",
  "class-variance-authority": "^0.7.1",
  "@radix-ui/react-slot": "^1.2.2",
  "@radix-ui/react-accordion": "^1.2.10",
  "@radix-ui/react-dialog": "^1.1.13",
  "@radix-ui/react-tabs": "^1.1.11",
};

const BUNDLED_BY_TEMPLATE = new Set(["react", "react-dom"]);

// Next.js modules aren't available in a plain-React sandbox, so we rewrite them
// to lightweight local shims. The original imports stay in the EXPORTED code —
// these shims only affect the live preview.
const SHIMS: Record<string, { path: string; code: string }> = {
  "next/image": {
    path: "/shims/next-image.tsx",
    code: `import React from "react";
export default function Image({ src, alt = "", width, height, fill, className, style, sizes, priority, quality, placeholder, blurDataURL, loader, unoptimized, ...rest }: any) {
  const resolved = typeof src === "string" ? src : src?.src;
  const s = fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style } : style;
  return <img src={resolved} alt={alt} width={fill ? undefined : width} height={fill ? undefined : height} className={className} style={s} {...rest} />;
}
`,
  },
  "next/link": {
    path: "/shims/next-link.tsx",
    code: `import React from "react";
export default function Link({ href, children, prefetch, replace, scroll, shallow, ...rest }: any) {
  const h = typeof href === "string" ? href : href?.pathname || "#";
  return <a href={h} {...rest}>{children}</a>;
}
`,
  },
  "next-view-transitions": {
    path: "/shims/next-view-transitions.tsx",
    code: `import React from "react";
export function Link({ href, children, ...rest }: any) {
  const h = typeof href === "string" ? href : href?.pathname || "#";
  return <a href={h} {...rest}>{children}</a>;
}
export function useTransitionRouter() { return { push: () => {}, replace: () => {} }; }
`,
  },
};

const IMPORT_RE = /(?:import|export)[^'"]*?from\s*['"]([^'"]+)['"]|import\s*['"]([^'"]+)['"]/g;

function extractSpecifiers(code: string): string[] {
  const specs: string[] = [];
  let m: RegExpExecArray | null;
  IMPORT_RE.lastIndex = 0;
  while ((m = IMPORT_RE.exec(code)) !== null) specs.push(m[1] ?? m[2]);
  return specs.filter(Boolean);
}

/** Bare npm package name from a specifier (handles scoped + subpaths). */
function npmPackage(spec: string): string | null {
  if (spec.startsWith(".") || spec.startsWith("/") || spec.startsWith("@/")) {
    return null;
  }
  if (spec.startsWith("@")) {
    const [scope, name] = spec.split("/");
    return name ? `${scope}/${name}` : scope;
  }
  return spec.split("/")[0];
}

function aliasToSandboxPath(spec: string): string {
  return spec.replace(/^@\//, "/");
}

/**
 * Rewrite a source file for the sandbox:
 * - `@/...` alias -> root-relative `/...`
 * - Next.js modules -> local shims
 * - root-absolute demo assets (`/avatars`, `/images`) -> absolute origin URLs
 *   so they load inside the cross-origin preview iframe.
 */
function rewriteImports(code: string, assetBase: string): string {
  let out = code.replace(/(['"])@\//g, "$1/");
  for (const spec of Object.keys(SHIMS)) {
    const re = new RegExp(`(['"])${spec.replace(/\//g, "\\/")}(['"])`, "g");
    out = out.replace(re, `$1${SHIMS[spec].path.replace(/\.tsx$/, "")}$2`);
  }
  if (assetBase) {
    out = out.replace(/(['"`])\/(avatars|images)\//g, `$1${assetBase}/$2/`);
  }
  return out;
}

export function serializeProps(props: Record<string, unknown>): string {
  return JSON.stringify(props ?? {}, null, 2);
}

/** Generate /App.tsx that renders the component with the given props. */
export function buildAppSource(
  props: Record<string, unknown>,
  dark = false
): string {
  return `import { useEffect } from "react";
import Component from "./Component";
import { ensureTailwind } from "./tailwind-runtime";

const props = ${serializeProps(props)};

export default function App() {
  useEffect(() => {
    ensureTailwind();
    document.documentElement.classList.toggle("dark", ${dark});
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-8 bg-background text-foreground">
      <Component {...props} />
    </div>
  );
}
`;
}

function tailwindRuntime(): string {
  return `const CSS = ${JSON.stringify(SANDBOX_TAILWIND_CSS)};
let injected = false;

export function ensureTailwind() {
  if (injected || typeof document === "undefined") return;
  injected = true;
  const style = document.createElement("style");
  style.setAttribute("type", "text/tailwindcss");
  style.textContent = CSS;
  document.head.appendChild(style);
  if (!document.querySelector("script[data-tw]")) {
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4";
    s.setAttribute("data-tw", "1");
    document.head.appendChild(s);
  }
}
`;
}

interface BuildOptions {
  props?: Record<string, unknown>;
  dark?: boolean;
  /** Origin to resolve `/avatars` and `/images` demo assets against. */
  assetBase?: string;
}

export function buildSandbox(
  item: RegistryItem,
  internalDeps: Record<string, string>,
  options: BuildOptions = {}
): SandboxBundle {
  const assetBase = options.assetBase ?? "";
  const files: SandboxBundle["files"] = {};
  const npm = new Set<string>();
  const usedShims = new Set<string>();
  const visitedInternal = new Set<string>();
  const queue: string[] = [];

  const scan = (code: string) => {
    for (const spec of extractSpecifiers(code)) {
      if (spec in SHIMS) {
        usedShims.add(spec);
        continue;
      }
      const pkg = npmPackage(spec);
      // Never try to npm-install Next or the view-transitions wrapper.
      if (pkg && pkg !== "next" && !BUNDLED_BY_TEMPLATE.has(pkg)) npm.add(pkg);
    }
  };

  // 1. Main editable component -> /Component.tsx
  const mainFile = item.files[0];
  files["/Component.tsx"] = {
    code: rewriteImports(mainFile.content, assetBase),
    active: true,
  };
  scan(mainFile.content);
  queue.push(mainFile.content);

  // 2. Other bundled files (e.g. a co-shipped hook).
  for (const f of item.files.slice(1)) {
    const sandboxPath = `${aliasToSandboxPath(
      f.target.replace(/\.(tsx|ts)$/, "")
    )}.tsx`;
    files[sandboxPath] = {
      code: rewriteImports(f.content, assetBase),
      hidden: true,
    };
    scan(f.content);
    queue.push(f.content);
  }

  // 3. Resolve internal `@/` imports recursively from the deps map.
  while (queue.length) {
    const code = queue.shift()!;
    for (const spec of extractSpecifiers(code)) {
      if (!spec.startsWith("@/")) continue;
      if (visitedInternal.has(spec)) continue;
      visitedInternal.add(spec);
      const source = internalDeps[spec];
      if (!source) {
        console.warn(`[studio] unresolved internal import: ${spec}`);
        continue;
      }
      files[`${aliasToSandboxPath(spec)}.tsx`] = {
        code: rewriteImports(source, assetBase),
        hidden: true,
      };
      scan(source);
      queue.push(source);
    }
  }

  // 4. Inject any Next.js shims that were referenced.
  for (const spec of usedShims) {
    files[SHIMS[spec].path] = { code: SHIMS[spec].code, hidden: true };
  }

  // 5. App entry + Tailwind runtime.
  files["/App.tsx"] = {
    code: buildAppSource(options.props ?? {}, !!options.dark),
  };
  files["/tailwind-runtime.ts"] = { code: tailwindRuntime(), hidden: true };

  // 6. Dependency version map.
  const dependencies: Record<string, string> = {};
  for (const pkg of npm) dependencies[pkg] = DEP_VERSIONS[pkg] ?? "latest";

  return { files, dependencies, entryComponentPath: "/Component.tsx" };
}
