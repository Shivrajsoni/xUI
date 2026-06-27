import type { ComponentControls } from "@/lib/studio/types";

const controls: ComponentControls = {
  props: [
    {
      type: "select",
      name: "intensity",
      label: "Beam intensity",
      default: "strong",
      options: [
        { label: "Subtle", value: "subtle" },
        { label: "Medium", value: "medium" },
        { label: "Strong", value: "strong" },
      ],
    },
  ],
};

export default controls;
