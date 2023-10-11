import { STORE_CONFIG_STEPS, StoreConfigStep } from "../../types";

export function calculateProgress(
  from: StoreConfigStep,
  to: StoreConfigStep,
): number {
  if (from === STORE_CONFIG_STEPS.FLEXIBILITY) {
    if (to === STORE_CONFIG_STEPS.SIMULTANEOUS) return 45;
    if (to === STORE_CONFIG_STEPS.GRANULARITY) return 36.5;
  } else if (from === STORE_CONFIG_STEPS.GRANULARITY) {
    if (to === STORE_CONFIG_STEPS.FLEXIBILITY) return 0;
    if (to === STORE_CONFIG_STEPS.ALLOW_OVER_NIGHT) return 55;
  } else if (from === STORE_CONFIG_STEPS.ALLOW_OVER_NIGHT) {
    if (to === STORE_CONFIG_STEPS.GRANULARITY) return 36.5;
    if (to === STORE_CONFIG_STEPS.SIMULTANEOUS) return 60;
  } else if (from === STORE_CONFIG_STEPS.SIMULTANEOUS) {
    if (to === STORE_CONFIG_STEPS.ALLOW_OVER_NIGHT) return 55;
    if (to === STORE_CONFIG_STEPS.FLEXIBILITY) return 0;
    if (to === STORE_CONFIG_STEPS.SPECIFIC_RESERVATION) return 67.5;
    if (to === STORE_CONFIG_STEPS.UNIQUENESS) return 80;
    if (to === STORE_CONFIG_STEPS.PERIODICITY) return 75;
  } else if (from === STORE_CONFIG_STEPS.UNIQUENESS) {
    if (to === STORE_CONFIG_STEPS.SIMULTANEOUS) return 55;
  } else if (from === STORE_CONFIG_STEPS.SPECIFIC_RESERVATION) {
    if (to === STORE_CONFIG_STEPS.SIMULTANEOUS) return 45;
    if (to === STORE_CONFIG_STEPS.PERIODICITY) return 80;
  } else if (from === STORE_CONFIG_STEPS.PERIODICITY) {
    if (to === STORE_CONFIG_STEPS.SIMULTANEOUS) return 45;
    if (to === STORE_CONFIG_STEPS.SPECIFIC_RESERVATION) return 67.5;
  }
  return 0;
}
