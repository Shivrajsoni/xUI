import type { ComponentControls } from "../types";

// Opt-in controls registry. To add live knobs for a component, create a
// co-located `<name>.controls.ts` exporting a ComponentControls, then map it
// here. Components without an entry fall back to background-only editing.
import loader02 from "@/components/xui/loader/loader-02.controls";
import card05 from "@/components/xui/card/card-05.controls";
import card06 from "@/components/xui/card/card-06.controls";
import card02 from "@/components/xui/card/card-02.controls";
import card03 from "@/components/xui/card/card-03.controls";
import profile01 from "@/components/xui/profile/profile-01.controls";
import profile02 from "@/components/xui/profile/profile-02.controls";
import btn03 from "@/components/xui/button/btn-03.controls";
import svg01 from "@/components/xui/svg/svg-01.controls";
import backgroundCircles from "@/components/xui/background-circles.controls";
import tweetCard from "@/components/xui/tweet-card.controls";

export const controlsRegistry: Record<string, ComponentControls> = {
  "loader-02": loader02,
  "card-05": card05,
  "card-06": card06,
  "card-02": card02,
  "card-03": card03,
  "profile-01": profile01,
  "profile-02": profile02,
  "btn-03": btn03,
  "svg-01": svg01,
  "background-circles": backgroundCircles,
  "tweet-card": tweetCard,
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
