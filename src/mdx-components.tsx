import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  // Cast guards against global JSX augmentation from other libs (react-three-fiber)
  // shifting the intrinsic-element component types away from mdx/types.
  return {
    ...defaultMdxComponents,
    ...components,
  } as MDXComponents;
}