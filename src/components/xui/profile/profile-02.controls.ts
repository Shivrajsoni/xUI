import type { ComponentControls } from "@/lib/studio/types";

const controls: ComponentControls = {
  props: [
    { type: "text", name: "name", label: "Name", default: "Alex Rivera" },
    { type: "text", name: "role", label: "Role", default: "Product Designer" },
    { type: "text", name: "subscription", label: "Subscription", default: "Free Trial" },
  ],
};

export default controls;
