import type { ComponentControls } from "@/lib/studio/types";

const controls: ComponentControls = {
  props: [
    { type: "text", name: "title", label: "Title", default: "Hand Written" },
    { type: "text", name: "subtitle", label: "Subtitle", default: "with xUI" },
  ],
};

export default controls;
