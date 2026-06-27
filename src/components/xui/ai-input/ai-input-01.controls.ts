import type { ComponentControls } from "@/lib/studio/types";

const controls: ComponentControls = {
  props: [
    { type: "text", name: "placeholder", label: "Placeholder", default: "Type your message..." },
  ],
};

export default controls;
