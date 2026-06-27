import { defineDocs, frontmatterSchema, metaSchema } from "fumadocs-mdx/config";

export const docs = defineDocs({
  dir: "src/content/docs",
  docs: { schema: frontmatterSchema },
  meta: { schema: metaSchema },
});
