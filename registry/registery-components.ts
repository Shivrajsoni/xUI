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
    registryDependencies: [],
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
    dependencies: ["lucide-react", "textarea"],
    registryDependencies: [],
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
];
