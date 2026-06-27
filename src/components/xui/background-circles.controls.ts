import type { ComponentControls } from "@/lib/studio/types";

const controls: ComponentControls = {
  props: [
    { type: "text", name: "title", label: "Title", default: "Background Circles" },
    { type: "text", name: "description", label: "Description", default: "Not Completely Round" },
    {
      type: "select",
      name: "variant",
      label: "Color variant",
      default: "octonary",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Tertiary", value: "tertiary" },
        { label: "Quaternary", value: "quaternary" },
        { label: "Quinary", value: "quinary" },
        { label: "Octonary", value: "octonary" },
      ],
    },
  ],
};

export default controls;
