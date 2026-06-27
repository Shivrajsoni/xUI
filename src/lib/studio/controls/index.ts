import type { ComponentControls } from "../types";

// Opt-in controls registry. To add live knobs for a component, create a
// co-located `<name>.controls.ts` exporting a ComponentControls, then map it
// here. Components without an entry fall back to background-only editing.
import card01 from "@/components/xui/card/card-01.controls";
import card02 from "@/components/xui/card/card-02.controls";
import card03 from "@/components/xui/card/card-03.controls";
import card04 from "@/components/xui/card/card-04.controls";
import card05 from "@/components/xui/card/card-05.controls";
import card06 from "@/components/xui/card/card-06.controls";
import btn01 from "@/components/xui/button/btn-01.controls";
import btn02 from "@/components/xui/button/btn-02.controls";
import btn03 from "@/components/xui/button/btn-03.controls";
import alert01 from "@/components/xui/alert/alert-01.controls";
import profile01 from "@/components/xui/profile/profile-01.controls";
import profile02 from "@/components/xui/profile/profile-02.controls";
import loader02 from "@/components/xui/loader/loader-02.controls";
import svg01 from "@/components/xui/svg/svg-01.controls";
import aiInput01 from "@/components/xui/ai-input/ai-input-01.controls";
import backgroundCircles from "@/components/xui/background-circles.controls";
import beamsBackground from "@/components/xui/beams-background.controls";
import tweetCard from "@/components/xui/tweet-card.controls";

export const controlsRegistry: Record<string, ComponentControls> = {
  "card-01": card01,
  "card-02": card02,
  "card-03": card03,
  "card-04": card04,
  "card-05": card05,
  "card-06": card06,
  "btn-01": btn01,
  "btn-02": btn02,
  "btn-03": btn03,
  "alert-01": alert01,
  "profile-01": profile01,
  "profile-02": profile02,
  "loader-02": loader02,
  "svg-01": svg01,
  "ai-input-01": aiInput01,
  "background-circles": backgroundCircles,
  "beams-background": beamsBackground,
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
