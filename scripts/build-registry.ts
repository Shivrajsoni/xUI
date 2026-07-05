import { registry } from "../registry";
import { siteConfig } from "../src/config/site";
import { promises as fs } from "fs";
import type { z } from "zod";
import type { registryItemFileSchema } from "../registry/schema";
import path from "path";

const REGISTRY_BASE_PATH = process.cwd();
const PUBLIC_FOLDER_BASE_PATH = "public/r";

/**
 * Generates the component registry JSON files in public/r.
 * Run with: bun run registry:build
 */
type File = z.infer<typeof registryItemFileSchema>;

async function writeFileRecursive(filePath: string, data: string) {
  const dir = path.dirname(filePath);

  try {
    await fs.mkdir(dir, { recursive: true });

    await fs.writeFile(filePath, data, "utf-8");
    console.log(`File written to ${filePath}`);
  } catch (error) {
    console.error(`Error writing file ${filePath}`);
    console.error(error);
  }
}

const getComponentFiles = async (files: File[], registryType: string) => {
  const filesArrayPromises = (files ?? []).map(async (file) => {
    if (typeof file === "string") {
      const normalizedPath = file.startsWith("/") ? file : `/${file}`;
      const filePath = path.join(REGISTRY_BASE_PATH, normalizedPath);
      const fileContent = await fs.readFile(filePath, "utf-8");

      const fileName = normalizedPath.split("/").pop() || "";

      return {
        type: registryType,
        content: fileContent,
        path: normalizedPath,
        target: `components/xui/${fileName}`,
      };
    }
    const normalizedPath = file.path.startsWith("/")
      ? file.path
      : `/${file.path}`;
    const filePath = path.join(REGISTRY_BASE_PATH, normalizedPath);
    const fileContent = await fs.readFile(filePath, "utf-8");

    const fileName = normalizedPath.split("/").pop() || "";

    const getTargetPath = (type: string) => {
      switch (type) {
        case "registry:hook":
          return `hooks/${fileName}`;
        case "registry:lib":
          return `lib/${fileName}`;
        case "registry:block":
          return `blocks/${fileName}`;
        default:
          return `components/xui/${fileName}`;
      }
    };

    const fileType =
      typeof file === "string" ? registryType : file.type || registryType;

    return {
      type: fileType,
      content: fileContent,
      path: normalizedPath,
      target:
        typeof file === "string"
          ? getTargetPath(registryType)
          : file.target || getTargetPath(fileType),
    };
  });

  const filesArray = await Promise.all(filesArrayPromises);
  return filesArray;
};

// Derive a human-friendly category + title from a component's primary file path.
// e.g. "src/components/xui/card/card-02.tsx" -> { category: "card", title: "Card 02" }
const deriveCatalogMeta = (component: (typeof registry)[number]) => {
  const firstFile = component.files?.[0];
  const filePath =
    typeof firstFile === "string" ? firstFile : firstFile?.path ?? "";
  const parts = filePath.split("/");
  const xuiIdx = parts.indexOf("xui");
  // Folder right after `xui` is the category; flat files fall back to the name.
  let category =
    xuiIdx >= 0 && parts.length - xuiIdx > 2
      ? parts[xuiIdx + 1]
      : component.name.replace(/-\d+$/, "");
  if (component.type === "registry:hook") category = "hooks";
  if (component.type === "registry:lib") category = "lib";

  const title = component.name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return { category, title };
};

const main = async () => {
  const catalog: Array<Record<string, unknown>> = [];

  for (let i = 0; i < registry.length; i++) {
    const component = registry[i];
    const files = component.files;
    if (!files) throw new Error("No files found for component");

    const filesArray = await getComponentFiles(files, component.type);

    const json = JSON.stringify(
      {
        ...component,
        files: filesArray,
      },
      null,
      2
    );
    const jsonPath = `${PUBLIC_FOLDER_BASE_PATH}/${component.name}.json`;
    await writeFileRecursive(jsonPath, json);

    const { category, title } = deriveCatalogMeta(component);
    catalog.push({
      name: component.name,
      type: component.type,
      category,
      title,
      description: component.description ?? "",
      dependencies: component.dependencies ?? [],
      registryDependencies: component.registryDependencies ?? [],
      files: filesArray.map((f) => ({ path: f.path, target: f.target })),
    });
  }

  // Lightweight catalog index (static, CDN-cacheable).
  await writeFileRecursive(
    `${PUBLIC_FOLDER_BASE_PATH}/registry.json`,
    JSON.stringify(catalog, null, 2)
  );
  console.log(`Wrote catalog index with ${catalog.length} entries`);

  // llms-full.txt — exhaustive, agent-consumable index of every registry item.
  const byCategory = new Map<string, typeof catalog>();
  for (const c of catalog) {
    const cat = String(c.category);
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat)!.push(c);
  }
  const lines: string[] = [
    `# ${siteConfig.name} — full component index (for AI agents)`,
    "",
    `> ${siteConfig.description}`,
    "",
    "Every component ships as source via a shadcn-compatible registry.",
    "",
    "## How to install any component",
    "```",
    `npx shadcn@latest add ${siteConfig.url}/r/{name}.json`,
    "```",
    `Or register the namespace once in components.json — { "registries": { "@xui": "${siteConfig.url}/r/{name}.json" } } — then: npx shadcn@latest add @xui/{name}`,
    "",
    `Machine-readable catalog (name, category, files, dependencies): ${siteConfig.url}/r/registry.json`,
    `Raw source for any item (JSON with embedded file contents): ${siteConfig.url}/r/{name}.json`,
    "",
  ];
  for (const [cat, items] of [...byCategory.entries()].sort()) {
    lines.push(`## ${cat}`);
    for (const c of items) {
      const desc = c.description ? ` — ${c.description}` : "";
      const deps = (c.dependencies as string[])?.length
        ? ` (deps: ${(c.dependencies as string[]).join(", ")})`
        : "";
      lines.push(`- ${c.name}${desc}${deps} — ${siteConfig.url}/r/${c.name}.json`);
    }
    lines.push("");
  }
  await writeFileRecursive("public/llms-full.txt", lines.join("\n"));
  console.log(`Wrote llms-full.txt (${catalog.length} items)`);
};

main()
  .then(() => {
    console.log("done");
  })
  .catch((err) => {
    console.error(err);
  });
