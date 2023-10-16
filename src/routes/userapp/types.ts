import {
  StoreConfig,
  Comment,
  SpecificAvailability,
  SubItem,
} from "../../types";

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

export type FlexibleReservationData = {
  start: string;
  end: string;
  amount: number;
};

export type FixedReservationData = {
  subItemList: SubItem[];
  amount: number;
};

export type RequiredUserInfo = (
  | "login"
  | "email"
  | "name"
  | "surname"
  | "phone"
)[];

export type UserData = {
  id: string;
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
};
export type ReservationRequest = {
  storeId: string;
  itemId: string;
  userData: UserData;
  reservationData: FlexibleReservationData | FixedReservationData;
};

export type FetchScheduleRequest = {
  itemId: string;
  amount: number;
};

export type FetchScheduleResponse = {
  itemId: string;
  amount: number;
  schedule: SpecificAvailability[];
};
