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
  RATING_AND_COMMENTS: "RATING_AND_COMMENTS",
  PRINT_SCHEMA: "PRINT_SCHEMA",
} as const;

export type SchemaStep = ObjectValues<typeof SCHEMA_STEPS>;

export type TimeFrame = "fixed" | "flexible";
export type Granularity = "granular" | "continuous";
export type UsersPerOffer = "one" | "many";
export type EntityUniqueness = boolean;
export type GapBetween = boolean;
export type SpecificSeats = boolean;
export type Periodicity = boolean;
export type Mechanics = {
  timeFrame?: TimeFrame;
  granularity?: Granularity;
  usersPerOffer?: UsersPerOffer;
  entityUniqueness?: EntityUniqueness;
  gapBetween?: GapBetween;
  specificSeats?: SpecificSeats;
  periodicity?: Periodicity;
};

export type CustomParam = {
  name: string;
  dataType: "string" | "number" | "boolean";
  isRequired: boolean;
  isFilterable: boolean;
};
export type RatingOptions = {
  allowRating: boolean;
  showRating: boolean;
};
export type CommentsOptions = {
  allowComments: boolean;
  showComments: boolean;
};

export type Schema = {
  mechanics: Mechanics;
  customParams: CustomParam[];
  ratingOptions: RatingOptions;
  commentsOptions: CommentsOptions;
};
