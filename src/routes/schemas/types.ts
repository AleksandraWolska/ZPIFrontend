import { ObjectValues } from "../../types";

export const SCHEMA_STEPS = {
  TIME_FRAME: "TIME_FRAME",
  GRANULARITY: "GRANULARITY",
  USERS_PER_OFFER: "USERS_PER_OFFER",
  ENTITY_UNIQUENESS: "ENTITY_UNIQUENESS",
  GAP_BETWEEN: "GAP_BETWEEN",
  SPECIFIC_SEATS: "SPECIFIC_SEATS",
  PERIODICITY: "PERIODICITY",
  CORE_SUMMARY: "CORE_SUMMARY",
  CUSTOM_PARAMS: "CUSTOM_PARAMS",
} as const;

export type SchemaStep = ObjectValues<typeof SCHEMA_STEPS>;

export type TimeFrame = "fixed" | "flexible";
export type Granularity = "granular" | "continuous";
export type UsersPerOffer = "one" | "many";
export type EntityUniqueness = boolean;
export type GapBetween = boolean;
export type SpecificSeats = boolean;
export type Periodicity = boolean;
export type CustomParam = {
  name: string;
  dataType: "string" | "number" | "boolean";
  isRequired: boolean;
  isFilterable: boolean;
};

export type Schema = {
  timeFrame: TimeFrame;
  granularity: Granularity;
  usersPerOffer: UsersPerOffer;
  entityUniqueness: EntityUniqueness;
  gapBetween: GapBetween;
  specificSeats: SpecificSeats;
  periodicity: Periodicity;
  customParams: CustomParam[];
};
