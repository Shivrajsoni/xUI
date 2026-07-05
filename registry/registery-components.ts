import type { Registry } from "./schema";

export const component: Registry = [
  {
    name: "ai-input-01",
    type: "registry:component",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "textarea"],
    files: [
      {
        path: "src/components/xui/ai-input/ai-input-01.tsx",
        type: "registry:component",
      },
      {
        path: "src/hooks/use-auto-resize-textarea.tsx",
        type: "registry:hook",
      },
    ],
  },
  {
    name: "btn-01",
    type: "registry:component",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "src/components/xui/button/btn-01.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "btn-02",
    type: "registry:component",
    registryDependencies: ["button"],
    files: [
      {
        path: "src/components/xui/button/btn-02.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "btn-03",
    type: "registry:component",
    dependencies: ["lucide-react", "motion"],
    registryDependencies: ["button"],
    files: [
      {
        path: "src/components/xui/button/btn-03.tsx",
        type: "registry:component",
      },
    ],
  },

  {
    name: "card-01",
    type: "registry:component",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "src/components/xui/card/card-01.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "card-02",
    type: "registry:component",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "src/components/xui/card/card-02.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "card-03",
    type: "registry:component",
    dependencies: ["lucide-react"],
    registryDependencies: [],
    files: [
      {
        path: "src/components/xui/card/card-03.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "card-05",
    type: "registry:component",
    dependencies: ["motion"],
    registryDependencies: [],
    files: [
      {
        path: "src/components/xui/card/card-05.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "card-04",
    type: "registry:component",
    dependencies: ["lucide-react"],
    registryDependencies: ["badge", "button"],
    files: [
      {
        path: "src/components/xui/card/card-04.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "card-06",
    type: "registry:component",
    description: "Interactive 3D portfolio card with mouse-tracked tilt and parallax depth.",
    dependencies: ["lucide-react"],
    files: [
      {
        path: "src/components/xui/card/card-06.tsx",
        type: "registry:component",
      },
    ],
  },

  {
    name: "alert-01",
    type: "registry:component",
    dependencies: ["lucide-react"],
    registryDependencies: [],
    files: [
      {
        path: "src/components/xui/alert/alert-01.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "alert-02",
    type: "registry:component",
    dependencies: ["lucide-react"],
    registryDependencies: ["alert"],
    files: [
      {
        path: "src/components/xui/alert/alert-02.tsx",
        type: "registry:component",
      },
    ],
  },

  {
    name: "faq-01",
    type: "registry:component",
    registryDependencies: ["accordion"],
    dependencies: [],
    files: [
      {
        path: "src/components/xui/faq/faq-01.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "faq-02",
    type: "registry:component",
    registryDependencies: ["accordion", "badge", "input"],
    dependencies: ["motion", "lucide-react"],
    files: [
      {
        path: "src/components/xui/faq/faq-02.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "list-01",
    type: "registry:component",
    registryDependencies: [],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "src/components/xui/list/list-01.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "list-02",
    type: "registry:component",
    registryDependencies: [],
    dependencies: ["lucide-react"],
    files: [
      {
        path: "src/components/xui/list/list-02.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "profile-01",
    type: "registry:component",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "src/components/xui/profile/profile-01.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "profile-02",
    type: "registry:component",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "src/components/xui/profile/profile-02.tsx",
        type: "registry:component",
      },
    ],
  },

  {
    name: "tweet-card",
    type: "registry:component",
    dependencies: ["lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "src/components/xui/tweet-card.tsx",
        type: "registry:component",
      },
    ],
  },

  {
    name: "action-search-bar",
    type: "registry:component",
    dependencies: ["lucide-react", "motion"],
    registryDependencies: ["input"],
    files: [
      {
        path: "src/components/xui/action-search-bar.tsx",
        type: "registry:component",
      },
      {
        path: "src/hooks/use-debounce.ts",
        type: "registry:hook",
      },
    ],
  },
  {
    name: "bento-grid",
    type: "registry:component",
    dependencies: ["lucide-react", "motion"],
    registryDependencies: [],
    files: [
      {
        path: "src/components/xui/bento-grid.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "background-circles",
    type: "registry:component",
    dependencies: ["motion"],
    registryDependencies: [],
    files: [
      {
        path: "src/components/xui/background-circles.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "background-paths",
    type: "registry:component",
    dependencies: ["motion"],
    registryDependencies: ["button"],
    files: [
      {
        path: "src/components/xui/background-paths.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "vercel-chat",
    type: "registry:component",
    dependencies: ["lucide-react"],
    registryDependencies: ["textarea"],
    files: [
      {
        path: "src/components/xui/vercel-chat.tsx",
        type: "registry:component",
      },
      {
        path: "src/hooks/use-auto-resize-textarea.tsx",
        type: "registry:hook",
      },
    ],
  },
  {
    name: "toolbar",
    type: "registry:component",
    dependencies: ["lucide-react", "motion"],
    registryDependencies: [],
    files: [
      {
        path: "src/components/xui/toolbar.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "beams-background",
    type: "registry:component",
    dependencies: ["motion"],
    registryDependencies: [],
    files: [
      {
        path: "src/components/xui/beams-background.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "avatar-picker",
    type: "registry:component",
    dependencies: ["lucide-react", "motion"],
    registryDependencies: ["card"],
    files: [
      {
        path: "src/components/xui/avatar-picker.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "loader-01",
    type: "registry:component",
    dependencies: ["motion"],
    registryDependencies: [],
    files: [
      {
        path: "src/components/xui/loader/loader-01.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "loader-02",
    type: "registry:component",
    dependencies: ["motion"],
    registryDependencies: [],
    files: [
      {
        path: "src/components/xui/loader/loader-02.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "svg-01",
    type: "registry:component",
    dependencies: ["motion"],
    registryDependencies: [],
    files: [
      {
        path: "src/components/xui/svg/svg-01.tsx",
        type: "registry:component",
      },
    ],
  },

  // --- Chat / AI ---
  {
    name: "chat-01",
    type: "registry:component",
    description: "Complete AI chat panel with model badge, user/assistant bubbles, spring typing indicator, and a controlled input row with attach, mic, and send.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/chat/chat-01.tsx", type: "registry:component" }],
  },
  {
    name: "chat-02",
    type: "registry:component",
    description: "Assistant message that typewriter-streams an answer with an inline code block, blinking caret, then fades in copy/retry/vote actions and a token-count label.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/chat/chat-02.tsx", type: "registry:component" }],
  },
  {
    name: "chat-03",
    type: "registry:component",
    description: "Hero AI prompt box with glowing focus ring, model-switch chip, attach and web-search toggles, and suggestion chips that fill the input.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/chat/chat-03.tsx", type: "registry:component" }],
  },
  {
    name: "chat-04",
    type: "registry:component",
    description: "Voice-assistant mic orb that breathes when idle and shows equalizer bars with expanding pulse rings while listening.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/chat/chat-04.tsx", type: "registry:component" }],
  },

  // --- Payment / fintech ---
  {
    name: "payment-01",
    type: "registry:component",
    description: "Premium credit card with click-to-flip 3D animation, cursor tilt, moving sheen, CSS-built EMV chip, and full front/back detailing.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/payment/payment-01.tsx", type: "registry:component" }],
  },
  {
    name: "payment-02",
    type: "registry:component",
    description: "Checkout order summary with line items, a promo-code input with animated discount row, and a spring-animated total.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: ["button", "input"],
    files: [{ path: "src/components/xui/payment/payment-02.tsx", type: "registry:component" }],
  },
  {
    name: "payment-03",
    type: "registry:component",
    description: "Transaction list grouped by day with tinted category icons, staggered row entrances, credit highlights, and a pending status pill.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/payment/payment-03.tsx", type: "registry:component" }],
  },
  {
    name: "payment-04",
    type: "registry:component",
    description: "Three-tier pricing section with an animated monthly/yearly toggle, spring price swaps, and an elevated most-popular tier.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: ["button"],
    files: [{ path: "src/components/xui/payment/payment-04.tsx", type: "registry:component" }],
  },
  {
    name: "payment-05",
    type: "registry:component",
    description: "Subscription usage card with a draw-on-mount SVG progress ring, slim linear meters, and an upgrade CTA.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: ["button"],
    files: [{ path: "src/components/xui/payment/payment-05.tsx", type: "registry:component" }],
  },

  // --- Navigation ---
  {
    name: "nav-01",
    type: "registry:component",
    description: "Glass navbar with backdrop blur, a product dropdown panel with icon items, ghost sign-in, and a solid CTA.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/nav/nav-01.tsx", type: "registry:component" }],
  },
  {
    name: "nav-02",
    type: "registry:component",
    description: "Floating pill navigation with an animated thumb that springs between active links via layoutId.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/nav/nav-02.tsx", type: "registry:component" }],
  },
  {
    name: "nav-03",
    type: "registry:component",
    description: "App sidebar with grouped sections, badge counts, an animated collapsible section, and a bottom user row.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/nav/nav-03.tsx", type: "registry:component" }],
  },
  {
    name: "nav-04",
    type: "registry:component",
    description: "macOS-style glass dock where app icons magnify based on cursor proximity, with tooltips and running-app dots.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/nav/nav-04.tsx", type: "registry:component" }],
  },
  {
    name: "nav-05",
    type: "registry:component",
    description: "Command palette rendered open with searchable grouped results, keyboard and hover selection, shortcuts, and a kbd-hint footer.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/nav/nav-05.tsx", type: "registry:component" }],
  },

  // --- Inputs / forms ---
  {
    name: "input-01",
    type: "registry:component",
    description: "Six-digit OTP input with auto-advance, paste support, shake-on-error, and an emerald verified state.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/input/input-01.tsx", type: "registry:component" }],
  },
  {
    name: "input-02",
    type: "registry:component",
    description: "Drag-and-drop upload dropzone with animated per-file progress, type icons, remove actions, and a size total.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/input/input-02.tsx", type: "registry:component" }],
  },
  {
    name: "input-03",
    type: "registry:component",
    description: "Search field with removable inline filter chips and an animated results dropdown that adds selections as chips.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/input/input-03.tsx", type: "registry:component" }],
  },
  {
    name: "input-04",
    type: "registry:component",
    description: "Tag input with tinted chips, Enter-to-add, a limit with shake feedback, counter, and quick-add suggestions.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/input/input-04.tsx", type: "registry:component" }],
  },
  {
    name: "form-01",
    type: "registry:component",
    description: "Sign-in card with GitHub/Google buttons, floating focus fields, show/hide password, animated checkbox, and a spinner-to-check submit.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/input/form-01.tsx", type: "registry:component" }],
  },

  // --- Stats / data ---
  {
    name: "stat-01",
    type: "registry:component",
    description: "Row of KPI stat cards with count-up numbers, delta badges, and gradient-filled SVG sparklines.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/stat/stat-01.tsx", type: "registry:component" }],
  },
  {
    name: "stat-02",
    type: "registry:component",
    description: "Activity card with three concentric SVG rings animating on mount, a center total, and legend rows.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/stat/stat-02.tsx", type: "registry:component" }],
  },
  {
    name: "stat-03",
    type: "registry:component",
    description: "Leaderboard card with medal treatments for the top three, staggered score bars, and a pinned current-user row.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/stat/stat-03.tsx", type: "registry:component" }],
  },

  // --- Notifications ---
  {
    name: "notification-01",
    type: "registry:component",
    description: "Notification center with animated All/Unread filter pills, mark-all-read, action rows, and an all-caught-up empty state.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/notification/notification-01.tsx", type: "registry:component" }],
  },
  {
    name: "notification-02",
    type: "registry:component",
    description: "Bottom-right toast stack with iOS-style depth scaling, auto-dismiss progress hairlines, and exit slides.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/notification/notification-02.tsx", type: "registry:component" }],
  },

  // --- Testimonials ---
  {
    name: "testimonial-01",
    type: "registry:component",
    description: "Two-row infinite testimonial marquee scrolling in opposite directions with edge fades and pause-on-hover.",
    dependencies: ["lucide-react"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/testimonial/testimonial-01.tsx", type: "registry:component" }],
  },
  {
    name: "testimonial-02",
    type: "registry:component",
    description: "Rotating serif spotlight quote that crossfades on a timer with clickable dot indicators.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/testimonial/testimonial-02.tsx", type: "registry:component" }],
  },

  // --- Onboarding ---
  {
    name: "onboarding-01",
    type: "registry:component",
    description: "Get-started checklist with animated progress, spring check draws, and a confetti completion state.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/onboarding/onboarding-01.tsx", type: "registry:component" }],
  },
  {
    name: "onboarding-02",
    type: "registry:component",
    description: "Three-step wizard with a filling stepper, direction-aware sliding panels, and an animated finish state.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/onboarding/onboarding-02.tsx", type: "registry:component" }],
  },

  // --- User ---
  {
    name: "user-01",
    type: "registry:component",
    description: "Profile dropdown with plan chip, shortcut menu items, an animated theme segmented control, and a sign-out row.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/user/user-01.tsx", type: "registry:component" }],
  },

  // --- header ---
  {
    name: "header-01",
    type: "registry:component",
    description: "SaaS marketing header with a two-column product mega-dropdown, What's-new card, auth CTAs and a mobile slide-down sheet.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/header/header-01.tsx", type: "registry:component" }],
  },
  {
    name: "header-02",
    type: "registry:component",
    description: "Centered-logo header with links split around the logo and a dismissible announcement bar that collapses with a height animation.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/header/header-02.tsx", type: "registry:component" }],
  },
  {
    name: "header-03",
    type: "registry:component",
    description: "Docs header with animated section-tab underline, ⌘K search field with focus glow, version dropdown chip and GitHub button.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/header/header-03.tsx", type: "registry:component" }],
  },
  {
    name: "header-04",
    type: "registry:component",
    description: "E-commerce header with category pills, centered search, wishlist and cart badges with a springing item count, and a free-shipping banner.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/header/header-04.tsx", type: "registry:component" }],
  },
  {
    name: "header-05",
    type: "registry:component",
    description: "Floating glassmorphic rounded-full header with layout-animated active pill, glowing CTA and a scroll-state compact transition.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/header/header-05.tsx", type: "registry:component" }],
  },

  // --- glass ---
  {
    name: "glass-01",
    type: "registry:component",
    description: "macOS-style Control Center glass panel with working connectivity toggles, draggable brightness and volume sliders, and a music mini-row.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/glass/glass-01.tsx", type: "registry:component" }],
  },
  {
    name: "glass-02",
    type: "registry:component",
    description: "Frosted now-playing music card with clickable seek scrubber, transport controls with press physics, and an AirPlay volume row.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/glass/glass-02.tsx", type: "registry:component" }],
  },
  {
    name: "glass-03",
    type: "registry:component",
    description: "iOS-style stacked glass notifications that expand into a list with spring depth, per-notification dismiss, and collapse control.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/glass/glass-03.tsx", type: "registry:component" }],
  },
  {
    name: "glass-04",
    type: "registry:component",
    description: "2x2 frosted macOS desktop widget grid: calendar, weather, animated battery ring, and a checkable reminders list.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/glass/glass-04.tsx", type: "registry:component" }],
  },
  {
    name: "glass-05",
    type: "registry:component",
    description: "mac Spotlight search with live filtering across grouped results, arrow-key selection highlight, and kbd hints on frosted glass.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/glass/glass-05.tsx", type: "registry:component" }],
  },

  // --- flow ---
  {
    name: "flow-01",
    type: "registry:component",
    description: "Live voice waveform strip with a traveling sine wave, sweeping gradient tint, mic pause toggle, and typing transcript.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/flow/flow-01.tsx", type: "registry:component" }],
  },
  {
    name: "flow-02",
    type: "registry:component",
    description: "Infinite logo cloud marquee that eases to a slower speed on hover, with edge fades and grayscale-to-color wordmarks.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/flow/flow-02.tsx", type: "registry:component" }],
  },
  {
    name: "flow-03",
    type: "registry:component",
    description: "Full-width ribbon of rotating capability words with blur-crossfade morphs and a continuously flowing gradient underline.",
    dependencies: ["framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/flow/flow-03.tsx", type: "registry:component" }],
  },
  {
    name: "flow-04",
    type: "registry:component",
    description: "Auto-drifting horizontal stream of feature cards with pause on hover, drag-to-scrub momentum, and seamless looping.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/flow/flow-04.tsx", type: "registry:component" }],
  },
  {
    name: "flow-05",
    type: "registry:component",
    description: "Calm hero panel with a slowly breathing gradient blob field whose copy lifts gently on each inhale.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    files: [{ path: "src/components/xui/flow/flow-05.tsx", type: "registry:component" }],
  },

  // --- table ---
  {
    name: "table-01",
    type: "registry:component",
    description: "Sortable data table with animated sort arrows, status pills, checkbox row selection, and a slide-in bulk-actions bar.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/table/table-01.tsx", type: "registry:component" }],
  },
  {
    name: "table-02",
    type: "registry:component",
    description: "Kanban column with drag-to-reorder task cards, labels, avatars, due chips, and a ghost row to append new tasks.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/table/table-02.tsx", type: "registry:component" }],
  },
  {
    name: "table-03",
    type: "registry:component",
    description: "Mini month calendar with sliding month transitions, today ring, event dots, and an event list for the selected day.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/table/table-03.tsx", type: "registry:component" }],
  },
  {
    name: "table-04",
    type: "registry:component",
    description: "File browser with breadcrumb path, inline-expanding folders, typed file icons, row selection, and a kebab action popover.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/table/table-04.tsx", type: "registry:component" }],
  },
  {
    name: "table-05",
    type: "registry:component",
    description: "Code diff viewer with additions/deletions chips, tinted added and removed lines, an expandable collapsed hunk, and a copy button.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/table/table-05.tsx", type: "registry:component" }],
  },

  // --- modal ---
  {
    name: "modal-01",
    type: "registry:component",
    description: "Destructive confirm dialog with type-to-confirm input and loading-to-done delete button.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button", "input"],
    files: [{ path: "src/components/xui/modal/modal-01.tsx", type: "registry:component" }],
  },
  {
    name: "modal-02",
    type: "registry:component",
    description: "Share sheet with copy-link tooltip, permission toggle chips, email invites and export actions.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button", "input"],
    files: [{ path: "src/components/xui/modal/modal-02.tsx", type: "registry:component" }],
  },
  {
    name: "modal-03",
    type: "registry:component",
    description: "Upgrade paywall with gradient-ring icon, staggered benefits, springing price toggle and sheen CTA.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    files: [{ path: "src/components/xui/modal/modal-03.tsx", type: "registry:component" }],
  },
  {
    name: "modal-04",
    type: "registry:component",
    description: "Keyboard-first confirm dialog with live Y/N keycaps and a progress-ring auto-cancel countdown.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    files: [{ path: "src/components/xui/modal/modal-04.tsx", type: "registry:component" }],
  },
  {
    name: "modal-05",
    type: "registry:component",
    description: "Onboarding tour card with a spring-tracked spotlight ring, step dots and finish state.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button"],
    files: [{ path: "src/components/xui/modal/modal-05.tsx", type: "registry:component" }],
  },

  // --- widget ---
  {
    name: "widget-01",
    type: "registry:component",
    description: "Weather card with animated sun/moon scene, hourly forecast strip, and a day/night sky toggle.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/widget/widget-01.tsx", type: "registry:component" }],
  },
  {
    name: "widget-02",
    type: "registry:component",
    description: "World clock with live-ticking analog mini clock faces, digital time, and day/night indicators for three cities.",
    dependencies: ["lucide-react"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/widget/widget-02.tsx", type: "registry:component" }],
  },
  {
    name: "widget-03",
    type: "registry:component",
    description: "GitHub-style habit heatmap with hoverable tooltips, click-to-cycle cells, streak counter, and legend.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/widget/widget-03.tsx", type: "registry:component" }],
  },
  {
    name: "widget-04",
    type: "registry:component",
    description: "Pomodoro timer with a smooth circular countdown ring, focus/break modes, and press-physics controls.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/widget/widget-04.tsx", type: "registry:component" }],
  },
  {
    name: "widget-05",
    type: "registry:component",
    description: "Device status card with battery charge bar, segmented storage breakdown, memory pressure gauge, and uptime.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/widget/widget-05.tsx", type: "registry:component" }],
  },

  // --- shop ---
  {
    name: "shop-01",
    type: "registry:component",
    description: "Product card with draggable gradient-art gallery, wishlist heart, size chips, and an add-to-cart button that morphs into a check.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/shop/shop-01.tsx", type: "registry:component" }],
  },
  {
    name: "shop-02",
    type: "registry:component",
    description: "Cart panel with animated quantity steppers, slide-out item removal, a free-shipping promo hint, and springy live totals.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/shop/shop-02.tsx", type: "registry:component" }],
  },
  {
    name: "shop-03",
    type: "registry:component",
    description: "Reviews summary with animated rating distribution bars, verified-purchase chip, highlighted snippets, and helpful toggles.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/shop/shop-03.tsx", type: "registry:component" }],
  },
  {
    name: "shop-04",
    type: "registry:component",
    description: "Variant picker with color swatches, sold-out size grid with notify tooltips, quantity stepper, live stock meter, and per-variant pricing.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/shop/shop-04.tsx", type: "registry:component" }],
  },
  {
    name: "shop-05",
    type: "registry:component",
    description: "Order tracking card with a four-step progress rail, traveling truck indicator, animated connector fill, ETA, and address block.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/shop/shop-05.tsx", type: "registry:component" }],
  },

  // --- media ---
  {
    name: "media-01",
    type: "registry:component",
    description: "Full music player card with rotating vinyl sheen, hover-scrub seek bar, morphing play/pause, like and queue actions, and an up-next row.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/media/media-01.tsx", type: "registry:component" }],
  },
  {
    name: "media-02",
    type: "registry:component",
    description: "16:9 video frame with hover-revealed control bar, center play burst, buffered timeline with chapter ticks, and an expanding volume slider.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/media/media-02.tsx", type: "registry:component" }],
  },
  {
    name: "media-03",
    type: "registry:component",
    description: "Podcast episode list with a single active row showing an animated equalizer and progress hairline, per-row play/pause, and a cycling speed chip.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/media/media-03.tsx", type: "registry:component" }],
  },
  {
    name: "media-04",
    type: "registry:component",
    description: "Three-image gallery card with crossfading stage, zoom toggle, caption bar, thumbnails, and arrow-key navigation.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/media/media-04.tsx", type: "registry:component" }],
  },
  {
    name: "media-05",
    type: "registry:component",
    description: "Audio waveform scrubber with 60 deterministic bars, drag-to-seek pointer handling, a following timestamp bubble, and animated skip controls.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/media/media-05.tsx", type: "registry:component" }],
  },

  // --- status ---
  {
    name: "status-01",
    type: "registry:component",
    description: "Presence avatar stack that fans out on hover with name tooltips, live typing indicator, and a segmented control to set your own status.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/status/status-01.tsx", type: "registry:component" }],
  },
  {
    name: "status-02",
    type: "registry:component",
    description: "Service uptime monitor with 30-day incident strips, hover tooltips, per-service status toggles, and a reactive overall-health header.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/status/status-02.tsx", type: "registry:component" }],
  },
  {
    name: "status-03",
    type: "registry:component",
    description: "Animated CI deploy pipeline with connected stage nodes, spinner ring, log line ticker, springy checkmarks, and a retryable failure path.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/status/status-03.tsx", type: "registry:component" }],
  },
  {
    name: "status-04",
    type: "registry:component",
    description: "Changelog list with version chips, typed New/Improved/Fixed badges, expandable entry details, and a subscribe-to-updates row.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: ["button", "input"],
    files: [{ path: "src/components/xui/status/status-04.tsx", type: "registry:component" }],
  },
  {
    name: "status-05",
    type: "registry:component",
    description: "Live-ops activity ticker where typed events slide in on an interval with tinted icon rings, pause-on-hover, and per-type filter chips.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/status/status-05.tsx", type: "registry:component" }],
  },

  // --- ai ---
  {
    name: "ai-01",
    type: "registry:component",
    description: "Agent run trace timeline with sequential tool steps, duration chips, collapsible outputs, and replay.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/ai/ai-01.tsx", type: "registry:component" }],
  },
  {
    name: "ai-02",
    type: "registry:component",
    description: "Model picker grouped by provider with capability chips, context labels, speed/quality dot meters, and search.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/ai/ai-02.tsx", type: "registry:component" }],
  },
  {
    name: "ai-03",
    type: "registry:component",
    description: "Token usage dashboard with count-up total, per-model stacked bar, 14-day mini chart, and budget warning.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/ai/ai-03.tsx", type: "registry:component" }],
  },
  {
    name: "ai-04",
    type: "registry:component",
    description: "Prompt template gallery with category filters, layout-animated grid, variable pills, copy and favorite actions.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/ai/ai-04.tsx", type: "registry:component" }],
  },
  {
    name: "ai-05",
    type: "registry:component",
    description: "AI code-review card with before/after diff, explanation callout, confidence meter, and animated accept merge.",
    dependencies: ["lucide-react", "framer-motion"],
    registryDependencies: [],
    files: [{ path: "src/components/xui/ai/ai-05.tsx", type: "registry:component" }],
  }
];
