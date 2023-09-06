import { ObjectValues } from "../../types";

export const SCHEMA_STEPS = {
  TIME_FRAME: "TIME_FRAME",
  GRANULARITY: "GRANULARITY",
  USERS_PER_OFFER: "USERS_PER_OFFER",
} as const;

export type SchemaStep = ObjectValues<typeof SCHEMA_STEPS>;

export type TimeFrame = "fixed" | "flexible";
export type Granularity = "granular" | "continuous";
export type UsersPerOffer = "one" | "many";

export type Schema = {
  timeFrame: TimeFrame;
  granularity: Granularity;
  usersPerOffer: UsersPerOffer;
};
