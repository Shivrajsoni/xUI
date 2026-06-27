import type { ComponentControls } from "@/lib/studio/types";

const controls: ComponentControls = {
  props: [
    { type: "text", name: "title", label: "Title", default: "xUI" },
    { type: "text", name: "description", label: "Description", default: "Use the CLI to install this!" },
  ],
};

export default controls;
