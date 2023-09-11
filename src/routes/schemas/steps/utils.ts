import { SCHEMA_STEPS, SchemaStep } from "../types";

export function calculateProgress(from: SchemaStep, to: SchemaStep): number {
  if (from === SCHEMA_STEPS.TIME_FRAME) {
    if (to === SCHEMA_STEPS.USERS_PER_OFFER) return 45;
    if (to === SCHEMA_STEPS.GRANULARITY) return 36.5;
  } else if (from === SCHEMA_STEPS.GRANULARITY) {
    if (to === SCHEMA_STEPS.TIME_FRAME) return 0;
    if (to === SCHEMA_STEPS.USERS_PER_OFFER) return 55;
  } else if (from === SCHEMA_STEPS.USERS_PER_OFFER) {
    if (to === SCHEMA_STEPS.GRANULARITY) return 45;
    if (to === SCHEMA_STEPS.TIME_FRAME) return 0;
    if (to === SCHEMA_STEPS.GAP_BETWEEN) return 67;
    if (to === SCHEMA_STEPS.SPECIFIC_SEATS) return 67.5;
    if (to === SCHEMA_STEPS.ENTITY_UNIQUENESS) return 80;
    if (to === SCHEMA_STEPS.PERIODICITY) return 75;
  } else if (from === SCHEMA_STEPS.ENTITY_UNIQUENESS) {
    if (to === SCHEMA_STEPS.GAP_BETWEEN) return 67;
    if (to === SCHEMA_STEPS.USERS_PER_OFFER) return 55;
  } else if (from === SCHEMA_STEPS.GAP_BETWEEN) {
    if (to === SCHEMA_STEPS.USERS_PER_OFFER) return 55;
    if (to === SCHEMA_STEPS.ENTITY_UNIQUENESS) return 83;
  } else if (from === SCHEMA_STEPS.SPECIFIC_SEATS) {
    if (to === SCHEMA_STEPS.USERS_PER_OFFER) return 45;
    if (to === SCHEMA_STEPS.PERIODICITY) return 80;
  } else if (from === SCHEMA_STEPS.PERIODICITY) {
    if (to === SCHEMA_STEPS.USERS_PER_OFFER) return 45;
    if (to === SCHEMA_STEPS.SPECIFIC_SEATS) return 67.5;
  }
  return 0;
}
