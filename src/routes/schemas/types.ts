import { ObjectValues } from "../../types";

export const USER_APP_CONFIG_STEPS = {
  LAYOUT_CONFIG: "LAYOUT_CONFIG",
  FLEXIBILITY: "FLEXIBILITY",
  GRANULARITY: "GRANULARITY",
  SIMULTANEOUS: "SIMULTANEOUS",
  UNIQUENESS: "UNIQUENESS",
  GAP_BETWEEN: "GAP_BETWEEN",
  SPECIFIC_RESERVATION: "SPECIFIC_RESERVATION",
  PERIODICITY: "PERIODICITY",
  CORE_SUMMARY: "CORE_SUMMARY",
  ATTRIBUTES: "ATTRIBUTES",
  RATING_AND_COMMENTS: "RATING_AND_COMMENTS",
  PRINT_SCHEMA: "PRINT_SCHEMA",
} as const;

export type UserAppConfigStep = ObjectValues<typeof USER_APP_CONFIG_STEPS>;

export type LayoutConfig = {
  name: string;
  welcomeTextLine1: string;
  welcomeTextLine2: string;
  logoSrc: string;
  showLogo: boolean;
  enableFiltering: boolean;
};

export type Flexibility = boolean;
export type Granularity = boolean;
export type Simultaneous = boolean;
export type Uniqueness = boolean;
export type GapBetween = boolean;
export type SpecificReservation = boolean;
export type Periodicity = boolean;
export type CoreConfig = {
  flexibility?: Flexibility;
  granularity?: Granularity;
  simultaneous?: Simultaneous;
  uniqueness?: Uniqueness;
  gapBetween?: GapBetween;
  specificReservation?: SpecificReservation;
  periodicity?: Periodicity;
};

export type Attribute = {
  name: string;
  dataType: "string" | "number" | "boolean";
  isRequired: boolean;
  isFilterable: boolean;
  showMainPage: boolean;
  showDetailsPage: boolean;
};
export type RatingOptions = {
  allowRating: boolean;
  showRating: boolean;
};
export type CommentsOptions = {
  allowComments: boolean;
  showComments: boolean;
};

export type UserAppConfig = {
  layoutConfig: LayoutConfig;
  coreConfig: CoreConfig;
  attributes: Attribute[];
  ratingOptions: RatingOptions;
  commentsOptions: CommentsOptions;
};
