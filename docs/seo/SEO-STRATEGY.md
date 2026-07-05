# xUI — SEO Strategy

Goal: rank xUI among the top free React + Tailwind component libraries (peer set: Aceternity UI, Kokonut UI, Magic UI, shadcn/ui ecosystem sites).

## The single most important insight (from live SERP data)

Aceternity's top organic rankings are **not** for library head terms — they are for **component-pattern keywords**, one indexable page per pattern:

| Keyword (US) | Vol/mo | Aceternity rank |
|---|---|---|
| cards stack | 2,900 | #2 |
| animated tabs | 1,900 | #1 |
| expandable card | 1,600 | #4 |
| typing ui | 1,600 | #8 |
| aurora backgrounds | 720 | #2 |
| shooting stars background | 390 | #1 |
| animated tooltip | 260 | #1 |

Head terms ("react components library" 1,300/mo, "tailwind components" 1,000/mo) are dominated by MUI/Flowbite/shadcn and are a 12-month play, not a starting point.

**Strategy: every component gets its own indexable page targeting a natural-language pattern keyword** ("text reveal card", "ai chat input react", "3d tilt card tailwind"), with live demo, copy-paste source, and install command above the fold.

## Positioning & keyword universe

- Primary axis: `{pattern} + react / tailwind` long-tails (10–2,900/mo each, LOW competition, hundreds of them).
- Secondary axis: freshness terms competitors under-serve: **"tailwind v4 components"**, **"react 19 components"**, **"shadcn registry"** — xUI is natively on the newest stack; say so in titles.
- Tertiary: comparison/alternative queries ("aceternity alternative", "free magic ui alternative").

## Five pillars

1. **Programmatic component pages** — split the current one-page-per-category docs (`/docs/components/card` holds 5 cards) into **one URL per component variant** with keyword-mapped slugs (`/docs/components/text-reveal-card`, not `card-05`). Each page: H1 = pattern keyword, live preview, full source, install command, props table, 2–3 paragraph explanation (what/when/how it works — this is what gets AI-cited).
2. **Custom domain (blocking)** — `*.vercel.app` subdomains cannot accumulate meaningful domain authority and inherit spam-neighborhood signals. Buy a domain (e.g. `xui.dev` / `x-ui.dev`), 301 the vercel.app URLs, update `siteConfig.url`, GSC, and llms.txt. Everything else compounds on this.
3. **GEO / AI citation** — already strong (llms.txt, AI crawlers welcomed in robots, TechArticle JSON-LD). Add: per-component llms.txt entries, quotable one-line component definitions in each doc page's opening paragraph, and keep registry JSON public (agents install directly).
4. **Backlinks via the registry ecosystem** — the shadcn registry is the link magnet: get listed in awesome-shadcn-ui, registry directories (registry.directory, shadcn.io ecosystem lists), Tailwind/React newsletters, and ship 2–3 "flagship" free components worth a Show HN / r/reactjs / X launch post each.
5. **Technical hygiene** — already done in-repo: sitemap.ts, robots.ts with AI crawlers, canonical URLs, TechArticle + WebSite + SoftwareApplication JSON-LD, OG images, static prerender (fast CWV). Keep `/preview/` noindexed.

## KPI targets

| Metric | Now | 3 mo | 6 mo | 12 mo |
|---|---|---|---|---|
| Indexed pages | ~25 | 60 (split component pages) | 120 | 250 |
| Keywords in top 10 | ~0 | 10 long-tails | 40 | 120 + 2 head terms |
| Referring domains | ~0 | 15 (directories/lists) | 50 | 150 |
| Organic clicks/mo | ~0 | 300 | 2,000 | 10,000 |
| AI citations (ChatGPT/Perplexity mentions) | 0 | tracked baseline | present for 5 patterns | present for 25 patterns |

## Risks

- Staying on vercel.app caps everything → treat custom domain as launch-blocking.
- Thin programmatic pages get soft-404'd → every component page needs the 2–3 explanatory paragraphs + props docs, not just a demo.
- Single-author site → add author page + GitHub-linked `sameAs` for E-E-A-T.
