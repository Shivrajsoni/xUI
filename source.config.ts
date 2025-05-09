import { defineCollections, defineDocs, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config';

export const docs = defineCollections({
  type:"doc",
  dir:"src/content/docs",
  schema:frontmatterSchema
});

export const meta = defineCollections({
    type:"meta",
    dir:"src/content/docs",
    schema:metaSchema
})