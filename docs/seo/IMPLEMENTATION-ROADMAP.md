# xUI — SEO Implementation Roadmap

## Phase 1 — Foundation (weeks 1–4) · unblocks everything
- [ ] Buy custom domain; set as canonical in `src/config/site.ts`; 301 vercel.app → new domain; verify in Google Search Console + Bing Webmaster; resubmit sitemap.
- [x] robots.ts with AI-crawler allowlist, `/preview/` disallowed
- [x] sitemap.ts (all docs pages)
- [x] JSON-LD: WebSite + SoftwareApplication (home), TechArticle (docs)
- [x] llms.txt current (no dead sections)
- [ ] Author/about page with GitHub + X `sameAs` links (E-E-A-T)
- [ ] GSC + GA4 (or Plausible) wired; baseline report saved

## Phase 2 — Programmatic component pages (weeks 5–12) · the core play
- [ ] Split multi-component docs pages into one URL per variant with keyword slugs:
      `card-05` → `/docs/components/text-reveal-card`, `card-04` → `/docs/components/3d-tilt-card`, `ai-input-01` → `/docs/components/ai-chat-input`, etc.
- [ ] Page template: H1 pattern keyword · live demo · install command · full source · props table · 2–3 paragraphs (what it is, when to use, how the effect works)
- [ ] Redirect old category anchors; keep category hub pages as ItemList index pages linking every variant
- [ ] Internal links: each component page links 3 related patterns ("related components" block)
- [ ] Target list (priority order, from SERP data): text reveal card · card stack · animated tabs · expandable card · animated tooltip · aurora/beams background · shooting-stars background · typing/AI input · 3d tilt card · profile dropdown card

## Phase 3 — Distribution & links (weeks 13–24)
- [ ] PR to awesome-shadcn-ui + registry directories (registry.directory etc.)
- [ ] Launch posts: one flagship component per month → X thread + r/reactjs + Show HN when strong
- [ ] Submit to JS/React newsletters (React Status, Bytes, Tailwind Weekly)
- [ ] Comparison pages: "Aceternity UI alternatives", "Magic UI vs xUI" (honest, feature-matrix format)

## Phase 4 — Authority & AI presence (months 7–12)
- [ ] Tutorial content: "how to build X" posts that embed the component (each targets a how-to SERP and links the component page)
- [ ] Track AI citations monthly (ask ChatGPT/Perplexity for "best free react animated components"; log mentions)
- [ ] Refresh top-20 pages quarterly (Google rewards freshness on component SERPs)
- [ ] Expand to 100+ components; every new component ships with its keyword-mapped page the same day

## Operating cadence
- Weekly: 1–2 new component pages (Phase 2 backlog first)
- Monthly: 1 flagship launch + link outreach batch; GSC review (impressions → new page ideas)
- Quarterly: content refresh + strategy check against KPI table in SEO-STRATEGY.md
