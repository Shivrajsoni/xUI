import type { ComponentControls } from "@/lib/studio/types";

const controls: ComponentControls = {
  props: [
    { type: "text", name: "name", label: "Name", default: "Alex Rivera" },
    { type: "text", name: "role", label: "Role", default: "Product Researcher" },
    { type: "text", name: "location", label: "Location", default: "San Francisco, CA" },
    { type: "text", name: "email", label: "Email", default: "alex@example.com" },
    { type: "text", name: "website", label: "Website", default: "example.com" },
    { type: "text", name: "bio", label: "Bio", default: "Designing interfaces that bridge the gap between complexity and simplicity." },
  ],
};

export default controls;
