import type { ComponentControls } from "@/lib/studio/types";

const gradients = [
  { label: "Teal → Cyan", value: "from-teal-300 to-cyan-500" },
  { label: "Cyan → Blue", value: "from-cyan-400 to-blue-600" },
  { label: "Fuchsia → Purple", value: "from-fuchsia-400 to-purple-600" },
  { label: "Rose → Orange", value: "from-rose-400 to-orange-500" },
  { label: "Emerald → Lime", value: "from-emerald-400 to-lime-500" },
];

const controls: ComponentControls = {
  props: [
    { type: "number", name: "size", label: "Size", default: 100, min: 40, max: 200, step: 4 },
    { type: "number", name: "bubbleCount", label: "Bubbles", default: 6, min: 0, max: 16, step: 1 },
    { type: "select", name: "colorLight", label: "Light gradient", default: "from-teal-300 to-cyan-500", options: gradients },
    { type: "select", name: "colorDark", label: "Dark gradient", default: "from-cyan-400 to-blue-600", options: gradients },
  ],
};

export default controls;
