import type { ComponentControls } from "@/lib/studio/types";

const controls: ComponentControls = {
  props: [
    { type: "text", name: "name", label: "Name", default: "Alex Rivera" },
    { type: "text", name: "role", label: "Role", default: "Senior Developer" },
    { type: "text", name: "status", label: "Status", default: "Open to Work" },
  ],
};

export default controls;
