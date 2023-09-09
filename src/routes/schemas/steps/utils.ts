import { Schema, SCHEMA_STEPS, SchemaStep } from "../types";

export function calculateProgress(
  from: SchemaStep,
  to: SchemaStep,
  schema: Partial<Schema>,
): number {
  if (from === SCHEMA_STEPS.TIME_FRAME) {
    if (to === SCHEMA_STEPS.USERS_PER_OFFER) return 53.5;
    if (to === SCHEMA_STEPS.GRANULARITY) return 45;
  } else if (from === SCHEMA_STEPS.GRANULARITY) {
    if (to === SCHEMA_STEPS.TIME_FRAME) return 0;
    if (to === SCHEMA_STEPS.USERS_PER_OFFER) return 67.5;
  } else if (from === SCHEMA_STEPS.USERS_PER_OFFER) {
    if (to === SCHEMA_STEPS.GRANULARITY) return 45;
    if (to === SCHEMA_STEPS.TIME_FRAME) return 0;
    if (to === SCHEMA_STEPS.GAP_BETWEEN) return 70;
    if (to === SCHEMA_STEPS.SPECIFIC_SEATS) return 87.5;
    if (to === SCHEMA_STEPS.ENTITY_UNIQUENESS) return 100;
  } else if (from === SCHEMA_STEPS.ENTITY_UNIQUENESS) {
    if (to === SCHEMA_STEPS.GAP_BETWEEN) return 70;
    if (to === SCHEMA_STEPS.USERS_PER_OFFER) return 67.5;
  } else if (from === SCHEMA_STEPS.GAP_BETWEEN) {
    if (to === SCHEMA_STEPS.USERS_PER_OFFER)
      return schema.timeFrame === "fixed" ? 53.5 : 67.5;
    if (to === SCHEMA_STEPS.SPECIFIC_SEATS) return 80;
    if (to === SCHEMA_STEPS.ENTITY_UNIQUENESS) return 100;
  } else if (from === SCHEMA_STEPS.SPECIFIC_SEATS) {
    if (to === SCHEMA_STEPS.GAP_BETWEEN) return 70;
    if (to === SCHEMA_STEPS.USERS_PER_OFFER) return 53.5;
    if (to === SCHEMA_STEPS.PERIODICITY) return 100;
    if (to === SCHEMA_STEPS.DUMMY) return 100;
  } else if (from === SCHEMA_STEPS.PERIODICITY) {
    if (to === SCHEMA_STEPS.SPECIFIC_SEATS)
      return schema.usersPerOffer === "one" ? 80 : 87.5;
  }
  return 0;
}
