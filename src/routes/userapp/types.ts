import { StoreConfig, Comment, Availability, SubItem, Item } from "../../types";

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

export type NewComment = Pick<
  Comment,
  "nickname" | "content" | "rating" | "datetime"
>;

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
  schedule: Availability[];
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

export type FlexibleReservationData = {
  start: string;
  end: string;
  amount: number;
};

export type FetchScheduleRequest = {
  itemId: string;
  amount: number;
};

export type FetchScheduleResponse = {
  itemId: string;
  amount: number;
  schedule: Availability[];
};

export type UserReservation = {
  reservationId: string;
  item: Pick<Item["attributes"], "title" | "subtitle"> & {
    id: string;
  };
  subItems?: Pick<SubItem, "title" | "subtitle" | "id">[];
  message?: string;
  confirmed: boolean;
  start: string;
  end?: string;
  amount?: number;
  status: string;
};
