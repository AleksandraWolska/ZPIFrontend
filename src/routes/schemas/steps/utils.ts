import { SCHEMA_STEPS, SchemaStep } from "../types";

export function calculateProgress(from: SchemaStep, to: SchemaStep): number {
  if (from === SCHEMA_STEPS.FLEXIBILITY) {
    if (to === SCHEMA_STEPS.SIMULTANEOUS) return 45;
    if (to === SCHEMA_STEPS.GRANULARITY) return 36.5;
  } else if (from === SCHEMA_STEPS.GRANULARITY) {
    if (to === SCHEMA_STEPS.FLEXIBILITY) return 0;
    if (to === SCHEMA_STEPS.SIMULTANEOUS) return 55;
  } else if (from === SCHEMA_STEPS.SIMULTANEOUS) {
    if (to === SCHEMA_STEPS.GRANULARITY) return 45;
    if (to === SCHEMA_STEPS.FLEXIBILITY) return 0;
    if (to === SCHEMA_STEPS.GAP_BETWEEN) return 67;
    if (to === SCHEMA_STEPS.SPECIFIC_RESERVATION) return 67.5;
    if (to === SCHEMA_STEPS.UNIQUENESS) return 80;
    if (to === SCHEMA_STEPS.PERIODICITY) return 75;
  } else if (from === SCHEMA_STEPS.UNIQUENESS) {
    if (to === SCHEMA_STEPS.GAP_BETWEEN) return 67;
    if (to === SCHEMA_STEPS.SIMULTANEOUS) return 55;
  } else if (from === SCHEMA_STEPS.GAP_BETWEEN) {
    if (to === SCHEMA_STEPS.SIMULTANEOUS) return 55;
    if (to === SCHEMA_STEPS.UNIQUENESS) return 83;
  } else if (from === SCHEMA_STEPS.SPECIFIC_RESERVATION) {
    if (to === SCHEMA_STEPS.SIMULTANEOUS) return 45;
    if (to === SCHEMA_STEPS.PERIODICITY) return 80;
  } else if (from === SCHEMA_STEPS.PERIODICITY) {
    if (to === SCHEMA_STEPS.SIMULTANEOUS) return 45;
    if (to === SCHEMA_STEPS.SPECIFIC_RESERVATION) return 67.5;
  }
  return 0;
}
