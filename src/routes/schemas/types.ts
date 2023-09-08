import { ObjectValues } from "../../types";

export const SCHEMA_STEPS = {
  TIME_FRAME: "TIME_FRAME",
  GRANULARITY: "GRANULARITY",
  USERS_PER_OFFER: "USERS_PER_OFFER",
  ENTITY_UNIQUENESS: "ENTITY_UNIQUENESS",
  GAP_BETWEEN: "GAP_BETWEEN",
  SPECIFIC_SEATS: "SPECIFIC_SEATS",
  PERIODICITY: "PERIODICITY",
  DUMMY: "DUMMY",
} as const;

export type SchemaStep = ObjectValues<typeof SCHEMA_STEPS>;

export type TimeFrame = "fixed" | "flexible";
export type Granularity = "granular" | "continuous";
export type UsersPerOffer = "one" | "many";
export type EntityUniqueness = boolean;
export type GapBetween = boolean;
export type SpecificSeats = boolean;
export type Periodicity = boolean;

export type Schema = {
  timeFrame: TimeFrame;
  granularity: Granularity;
  usersPerOffer: UsersPerOffer;
  entityUniqueness: EntityUniqueness;
  gapBetween: GapBetween;
  specificSeats: SpecificSeats;
  periodicity: Periodicity;
};
