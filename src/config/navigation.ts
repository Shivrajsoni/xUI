export interface NavItem {
    id: string | number;
    title: string;
    href: string;
    description?: string;
    count?: number | string;
    isComingSoon?: boolean;
    isNew?: boolean;
    isLab?: boolean;
}

export interface NavSection {
    title: string;
    items: NavItem[];
}

export const navigationSections: NavSection[] = [
    {
        title: "Getting Started",
        items: [
            {
                id: "intro",
                title: "Installation",
                href: "/docs",
                description: "Introduction and usage guidelines",
            },
        ],
    },
    {
        title: "Components",
        items: [
            {
                id: 1,
                title: "AI-Input",
                href: "/docs/components/ai-input",
                description: "Modern AI chat interface components",
                count: 1,
            },
            {
                id: 2,
                title: "Alerts",
                href: "/docs/components/alert",
                description: "Alert components and layouts",
                count: 2,
            },
            {
                id: 3,
                title: "Button",
                href: "/docs/components/button",
                description: "Interactive button components with animations",
                count: 3,
            },
            {
                id: 4,
                title: "Card",
                href: "/docs/components/card",
                description: "Versatile card components and layouts",
                count: 3,
            },
            {
                id: 5,
                title: "Faq",
                href: "/docs/components/faq",
                description: "Frequently asked questions",
                count: 2,
            },
            {
                id: 7,
                title: "List",
                href: "/docs/components/list",
                description: "List components and layouts",
                count: 2,
            },
            {
                id: 9,
                title: "Profile",
                href: "/docs/components/profile",
                description: "Profile components and layouts",
                count: 2,
                isNew: true,
            },
        ],
    },
    {
        title: "Hooks",
        items: [
            {
                id: 1,
                title: "useAutoResizeTextarea",
                href: "/docs/hooks/use-auto-resize-textarea",
            },
        ],
    },
];