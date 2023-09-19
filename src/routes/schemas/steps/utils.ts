import { USER_APP_CONFIG_STEPS, UserAppConfigStep } from "../types";

export function calculateProgress(
  from: UserAppConfigStep,
  to: UserAppConfigStep,
): number {
  if (from === USER_APP_CONFIG_STEPS.FLEXIBILITY) {
    if (to === USER_APP_CONFIG_STEPS.SIMULTANEOUS) return 45;
    if (to === USER_APP_CONFIG_STEPS.GRANULARITY) return 36.5;
  } else if (from === USER_APP_CONFIG_STEPS.GRANULARITY) {
    if (to === USER_APP_CONFIG_STEPS.FLEXIBILITY) return 0;
    if (to === USER_APP_CONFIG_STEPS.SIMULTANEOUS) return 55;
  } else if (from === USER_APP_CONFIG_STEPS.SIMULTANEOUS) {
    if (to === USER_APP_CONFIG_STEPS.GRANULARITY) return 45;
    if (to === USER_APP_CONFIG_STEPS.FLEXIBILITY) return 0;
    if (to === USER_APP_CONFIG_STEPS.GAP_BETWEEN) return 67;
    if (to === USER_APP_CONFIG_STEPS.SPECIFIC_RESERVATION) return 67.5;
    if (to === USER_APP_CONFIG_STEPS.UNIQUENESS) return 80;
    if (to === USER_APP_CONFIG_STEPS.PERIODICITY) return 75;
  } else if (from === USER_APP_CONFIG_STEPS.UNIQUENESS) {
    if (to === USER_APP_CONFIG_STEPS.GAP_BETWEEN) return 67;
    if (to === USER_APP_CONFIG_STEPS.SIMULTANEOUS) return 55;
  } else if (from === USER_APP_CONFIG_STEPS.GAP_BETWEEN) {
    if (to === USER_APP_CONFIG_STEPS.SIMULTANEOUS) return 55;
    if (to === USER_APP_CONFIG_STEPS.UNIQUENESS) return 83;
  } else if (from === USER_APP_CONFIG_STEPS.SPECIFIC_RESERVATION) {
    if (to === USER_APP_CONFIG_STEPS.SIMULTANEOUS) return 45;
    if (to === USER_APP_CONFIG_STEPS.PERIODICITY) return 80;
  } else if (from === USER_APP_CONFIG_STEPS.PERIODICITY) {
    if (to === USER_APP_CONFIG_STEPS.SIMULTANEOUS) return 45;
    if (to === USER_APP_CONFIG_STEPS.SPECIFIC_RESERVATION) return 67.5;
  }
  return 0;
}
