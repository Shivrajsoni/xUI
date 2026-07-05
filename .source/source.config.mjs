// source.config.ts
import { defineDocs, frontmatterSchema, metaSchema } from "fumadocs-mdx/config";
var docs = defineDocs({
  dir: "src/content/docs",
  docs: { schema: frontmatterSchema },
  meta: { schema: metaSchema }
});
export {
  docs
};
