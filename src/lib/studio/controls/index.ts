import type { ComponentControls } from "../types";

// Opt-in controls registry. To add live knobs for a component, create a
// co-located `<name>.controls.ts` exporting a ComponentControls, then map it
// here. Components without an entry fall back to code-only editing.
import loader02 from "@/components/xui/loader/loader-02.controls";
import card05 from "@/components/xui/card/card-05.controls";
import card06 from "@/components/xui/card/card-06.controls";
import card02 from "@/components/xui/card/card-02.controls";
import profile01 from "@/components/xui/profile/profile-01.controls";
import btn03 from "@/components/xui/button/btn-03.controls";

export const controlsRegistry: Record<string, ComponentControls> = {
  "loader-02": loader02,
  "card-05": card05,
  "card-06": card06,
  "card-02": card02,
  "profile-01": profile01,
  "btn-03": btn03,
};

export function getControls(name: string): ComponentControls | undefined {
  return controlsRegistry[name];
}

/** Build the initial props object from a component's control defaults. */
export function defaultPropsFor(name: string): Record<string, unknown> {
  const controls = controlsRegistry[name];
  if (!controls) return {};
  const props: Record<string, unknown> = {};
  for (const field of controls.props) props[field.name] = field.default;
  return props;
}
