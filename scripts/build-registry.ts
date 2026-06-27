import { registry } from "../registry";
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
        target: `@/components/xui/${fileName}`,
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
          return `@/hooks/${fileName}`;
        case "registry:lib":
          return `@/lib/${fileName}`;
        case "registry:block":
          return `@/blocks/${fileName}`;
        default:
          return `@/components/xui/${fileName}`;
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

// Collect the source of every internal `@/` module the Studio sandbox might need
// (cn util, shadcn ui components, hooks), keyed by import specifier. The Studio
// resolves `@/...` imports against this map when seeding a sandbox.
const collectInternalDeps = async () => {
  const map: Record<string, string> = {};
  const root = REGISTRY_BASE_PATH;

  const addDir = async (dir: string, prefix: string) => {
    let entries: string[] = [];
    try {
      entries = await fs.readdir(path.join(root, dir));
    } catch {
      return;
    }
    for (const entry of entries) {
      if (!/\.(tsx?|ts)$/.test(entry)) continue;
      const content = await fs.readFile(path.join(root, dir, entry), "utf-8");
      const base = entry.replace(/\.(tsx|ts)$/, "");
      map[`${prefix}/${base}`] = content;
    }
  };

  await addDir("src/components/ui", "@/components/ui");
  await addDir("src/hooks", "@/hooks");
  map["@/lib/utils"] = await fs.readFile(
    path.join(root, "src/lib/utils.ts"),
    "utf-8"
  );

  return map;
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

  // Lightweight catalog index for the Studio (static, CDN-cacheable).
  await writeFileRecursive(
    `${PUBLIC_FOLDER_BASE_PATH}/registry.json`,
    JSON.stringify(catalog, null, 2)
  );
  console.log(`Wrote catalog index with ${catalog.length} entries`);

  // Internal `@/` module source map for the Studio sandbox resolver.
  const internalDeps = await collectInternalDeps();
  await writeFileRecursive(
    `${PUBLIC_FOLDER_BASE_PATH}/_deps.json`,
    JSON.stringify(internalDeps, null, 2)
  );
  console.log(
    `Wrote internal deps map with ${Object.keys(internalDeps).length} modules`
  );
};

main()
  .then(() => {
    console.log("done");
  })
  .catch((err) => {
    console.error(err);
  });
