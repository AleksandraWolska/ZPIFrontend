import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";

export function calculateProgress(
  from: StoreConfigStep,
  to: StoreConfigStep,
): number {
  if (to === STORE_CONFIG_STEPS.GENERAL_STORE_INFO) return 0;
  if (to === STORE_CONFIG_STEPS.FLEXIBILITY) return 5;
  if (from === STORE_CONFIG_STEPS.FLEXIBILITY) {
    if (to === STORE_CONFIG_STEPS.SIMULTANEOUS) return 30;
    if (to === STORE_CONFIG_STEPS.GRANULARITY) return 15;
  } else if (from === STORE_CONFIG_STEPS.GRANULARITY) {
    if (to === STORE_CONFIG_STEPS.SIMULTANEOUS) return 30;
    if (to === STORE_CONFIG_STEPS.ALLOW_OVER_NIGHT) return 20;
  } else if (from === STORE_CONFIG_STEPS.ALLOW_OVER_NIGHT) {
    if (to === STORE_CONFIG_STEPS.GRANULARITY) return 15;
    if (to === STORE_CONFIG_STEPS.SIMULTANEOUS) return 30;
  } else if (from === STORE_CONFIG_STEPS.SIMULTANEOUS) {
    if (to === STORE_CONFIG_STEPS.GRANULARITY) return 15;
    if (to === STORE_CONFIG_STEPS.ALLOW_OVER_NIGHT) return 20;
    if (to === STORE_CONFIG_STEPS.SPECIFIC_RESERVATION) return 40;
    if (to === STORE_CONFIG_STEPS.UNIQUENESS) return 40;
    if (to === STORE_CONFIG_STEPS.PERIODICITY) return 45;
  } else if (from === STORE_CONFIG_STEPS.UNIQUENESS) {
    if (to === STORE_CONFIG_STEPS.SIMULTANEOUS) return 30;
  } else if (from === STORE_CONFIG_STEPS.SPECIFIC_RESERVATION) {
    if (to === STORE_CONFIG_STEPS.SIMULTANEOUS) return 30;
    if (to === STORE_CONFIG_STEPS.PERIODICITY) return 45;
  } else if (from === STORE_CONFIG_STEPS.PERIODICITY) {
    if (to === STORE_CONFIG_STEPS.SIMULTANEOUS) return 30;
    if (to === STORE_CONFIG_STEPS.SPECIFIC_RESERVATION) return 40;
  }
  if (from === STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC) {
    if (to === STORE_CONFIG_STEPS.PERIODICITY) return 45;
    if (to === STORE_CONFIG_STEPS.SPECIFIC_RESERVATION) return 40;
    if (to === STORE_CONFIG_STEPS.UNIQUENESS) return 40;
    if (to === STORE_CONFIG_STEPS.SIMULTANEOUS) return 30;
  }
  if (to === STORE_CONFIG_STEPS.CUSTOM_ATTRIBUTES_SPEC) return 50;
  if (to === STORE_CONFIG_STEPS.MAIN_PAGE) return 65;
  if (to === STORE_CONFIG_STEPS.DETAILS_PAGE) return 75;
  if (to === STORE_CONFIG_STEPS.AUTH_CONFIG) return 100;
  if (to === STORE_CONFIG_STEPS.SUMMARY) return 100;
  return 0;
}
