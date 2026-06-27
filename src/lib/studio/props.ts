// Studio control values are stored flat, but control names may use dot paths
// (e.g. "author.name") to target nested component props. expandProps turns the
// flat map into the nested object the component actually expects.

export function expandProps(
  flat: Record<string, unknown>
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(flat)) {
    if (!key.includes(".")) {
      out[key] = value;
      continue;
    }
    const parts = key.split(".");
    let node = out;
    for (let i = 0; i < parts.length - 1; i++) {
      const p = parts[i];
      if (typeof node[p] !== "object" || node[p] === null) node[p] = {};
      node = node[p] as Record<string, unknown>;
    }
    node[parts[parts.length - 1]] = value;
  }
  return out;
}
