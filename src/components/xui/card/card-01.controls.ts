import type { ComponentControls } from "@/lib/studio/types";

const controls: ComponentControls = {
  props: [
    { type: "text", name: "author.name", label: "Author name", default: "Alex Rivera" },
    { type: "text", name: "author.username", label: "Handle", default: "alexrivera" },
    {
      type: "text",
      name: "content.text",
      label: "Post text",
      default:
        "Just shipped a new component library! Check out the docs and let me know what you think 🎨",
    },
    { type: "number", name: "engagement.likes", label: "Likes", default: 128, min: 0, max: 9999, step: 1 },
    { type: "number", name: "engagement.comments", label: "Comments", default: 32, min: 0, max: 999, step: 1 },
    { type: "number", name: "engagement.shares", label: "Shares", default: 24, min: 0, max: 999, step: 1 },
    { type: "boolean", name: "engagement.isLiked", label: "Liked", default: true },
    { type: "boolean", name: "engagement.isBookmarked", label: "Bookmarked", default: false },
  ],
};

export default controls;
