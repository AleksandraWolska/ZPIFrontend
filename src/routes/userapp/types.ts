import { StoreConfig, Comment, SpecificAvailability } from "../../types";

export type FilterValue = {
  attributeKey: string;
  attributeName: string;
  value: string | number | boolean;
};

export type DetailsPageConfig = Pick<
  StoreConfig,
  "customAttributesSpec" | "detailsPage" | "core"
>;

export type MainPageConfig = Pick<
  StoreConfig,
  "customAttributesSpec" | "mainPage"
>;

export type CommentList = Comment[];

export type CheckAvailabilityRequest = {
  startDate: string;
  amount: number;
  endDate: string;
  itemId: string;
};

export type CheckAvailabilityResponseSuggestion = {
  id: string;
  itemId: string;
  amount: number;
  schedule: SpecificAvailability[];
  suggestedStart: string;
  suggestedEnd: string;
};

export type CheckAvailabilityResponseSuccess = {
  id: string;
  itemId: string;
  amount: number;
  start: string;
  end: string;
};

export type CheckAvailabilityResponseFailure = {
  id: string;
  itemId: string;
};

export type CheckAvailabilityResponse =
  | CheckAvailabilityResponseSuggestion
  | CheckAvailabilityResponseSuccess
  | CheckAvailabilityResponseFailure;
