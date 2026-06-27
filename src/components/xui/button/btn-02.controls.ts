import type { ComponentControls } from "@/lib/studio/types";

const controls: ComponentControls = {
  props: [
    { type: "text", name: "children", label: "Label", default: "Continue" },
  ],
};

export default controls;
