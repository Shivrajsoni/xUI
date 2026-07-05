import type { Registry } from "./schema";

export const hooks: Registry = [
  {
    name: "use-auto-resize-textarea",
    type: "registry:hook",
    files: [
      {
        path: "src/hooks/use-auto-resize-textarea.tsx",
        type: "registry:hook",
      },
    ],
  },
  {
    name: "use-debounce",
    type: "registry:hook",
    files: [
      {
        path: "src/hooks/use-debounce.ts",
        type: "registry:hook",
      },
    ],
  },
];
