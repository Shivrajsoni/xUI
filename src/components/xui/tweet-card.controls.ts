import type { ComponentControls } from "@/lib/studio/types";

const controls: ComponentControls = {
  props: [
    { type: "text", name: "authorName", label: "Author", default: "Alex Rivera" },
    { type: "text", name: "authorHandle", label: "Handle", default: "alexrivera" },
    { type: "text", name: "timestamp", label: "Timestamp", default: "Jan 18, 2025" },
    { type: "boolean", name: "isVerified", label: "Verified", default: true },
  ],
};

export default controls;
