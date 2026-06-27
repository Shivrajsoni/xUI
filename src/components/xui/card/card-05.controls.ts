import type { ComponentControls } from "@/lib/studio/types";

const controls: ComponentControls = {
  props: [
    { type: "text", name: "text", label: "Text", default: "Hover over me" },
    { type: "text", name: "revealText", label: "Reveal text", default: "You found me" },
  ],
};

export default controls;
