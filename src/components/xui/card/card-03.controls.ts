import type { ComponentControls } from "@/lib/studio/types";

const controls: ComponentControls = {
  props: [
    { type: "text", name: "projectName", label: "Project name", default: "To complete" },
    { type: "text", name: "description", label: "Description", default: "Revamp the design of the website" },
  ],
};

export default controls;
