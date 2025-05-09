import { component } from "./registery-components";
import { hooks } from "./registery-hooks";
import { lib } from "./registery-lib";
import type { Registry } from "./schema";

export const registry: Registry = [...component, ...hooks, ...lib];
