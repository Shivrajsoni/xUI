import type { ComponentControls } from "@/lib/studio/types";

const controls: ComponentControls = {
  props: [
    { type: "number", name: "perspective", label: "Perspective", default: 1500, min: 500, max: 3000, step: 100 },
    { type: "number", name: "rotationIntensity", label: "Tilt intensity", default: 25, min: 5, max: 50, step: 1 },
    { type: "boolean", name: "showGlow", label: "Glow", default: true },
    { type: "boolean", name: "showParticles", label: "Particles", default: true },
    { type: "number", name: "particleCount", label: "Particle count", default: 25, min: 0, max: 80, step: 1 },
  ],
};

export default controls;
