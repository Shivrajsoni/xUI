import type { ComponentControls } from "@/lib/studio/types";

const controls: ComponentControls = {
  props: [
    { type: "text", name: "name", label: "Name", default: "Alex Rivera" },
    { type: "text", name: "role", label: "Role", default: "Product Designer & Developer" },
    { type: "text", name: "tagline", label: "Tagline", default: "I craft interfaces that feel as good as they look." },
    {
      type: "select",
      name: "accent",
      label: "Accent",
      default: "violet",
      options: [
        { label: "Violet", value: "violet" },
        { label: "Rose", value: "rose" },
        { label: "Emerald", value: "emerald" },
        { label: "Amber", value: "amber" },
        { label: "Sky", value: "sky" },
      ],
    },
  ],
};

export default controls;
