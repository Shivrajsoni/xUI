// Control schema for the Studio customization panel.
// A component opts in by exporting a ComponentControls from a co-located
// `<name>.controls.ts`; without one, Studio falls back to code-only editing.

export type ControlField =
  | {
      type: "text";
      name: string;
      label: string;
      default: string;
      placeholder?: string;
    }
  | {
      type: "number";
      name: string;
      label: string;
      default: number;
      min?: number;
      max?: number;
      step?: number;
    }
  | {
      type: "color";
      name: string;
      label: string;
      default: string;
    }
  | {
      type: "select";
      name: string;
      label: string;
      default: string;
      options: { label: string; value: string }[];
    }
  | {
      type: "boolean";
      name: string;
      label: string;
      default: boolean;
    };

export interface ComponentControls {
  /** Editable props surfaced as live knobs. */
  props: ControlField[];
}

/** A single component entry from public/r/registry.json. */
export interface CatalogEntry {
  name: string;
  type: string;
  category: string;
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: { path: string; target: string }[];
}

/** A fully-loaded registry item from public/r/<name>.json. */
export interface RegistryItem extends Omit<CatalogEntry, "files"> {
  files: { path: string; target: string; content: string; type?: string }[];
}

/** Output of buildSandbox: ready to hand to <SandpackProvider>. */
export interface SandboxBundle {
  files: Record<string, { code: string; active?: boolean; hidden?: boolean; readOnly?: boolean }>;
  dependencies: Record<string, string>;
  entryComponentPath: string;
}
