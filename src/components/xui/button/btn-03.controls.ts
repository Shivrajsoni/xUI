import type { ComponentControls } from "@/lib/studio/types";

const controls: ComponentControls = {
  props: [
    { type: "number", name: "particleCount", label: "Particles", default: 12, min: 0, max: 40, step: 1 },
  ],
};

export default controls;
