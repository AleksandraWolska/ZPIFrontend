import { ObjectValues } from "../../types";

export const STORE_CONFIG_STEPS = {
  OWNER: "OWNER",
  FLEXIBILITY: "FLEXIBILITY",
  GRANULARITY: "GRANULARITY",
  SIMULTANEOUS: "SIMULTANEOUS",
  UNIQUENESS: "UNIQUENESS",
  SPECIFIC_RESERVATION: "SPECIFIC_RESERVATION",
  PERIODICITY: "PERIODICITY",
  CUSTOM_ATTRIBUTES_SPEC: "CUSTOM_ATTRIBUTES_SPEC",
  MAIN_PAGE: "MAIN_PAGE",
  DETAILS_PAGE: "DETAILS_PAGE",
  PRINT_STORE_CONFIG: "PRINT_STORE_CONFIG",
} as const;

export type StoreConfigStep = ObjectValues<typeof STORE_CONFIG_STEPS>;

export type Owner = {
  name: string;
  logoSrc: string;
  phone: string;
  email: string;
};

export type Flexibility = boolean;
export type Granularity = boolean;
export type Simultaneous = boolean;
export type Uniqueness = boolean;
export type SpecificReservation = boolean;
export type Periodicity = boolean;
export type Core = {
  flexibility?: Flexibility;
  granularity?: Granularity;
  simultaneous?: Simultaneous;
  uniqueness?: Uniqueness;
  specificReservation?: SpecificReservation;
  periodicity?: Periodicity;
};

export type CustomAttributeSpec = {
  id: string;
  name: string;
  dataType: "string" | "number" | "boolean";
  isRequired: boolean;
  isFilterable: boolean;
  showMainPage: boolean;
  showDetailsPage: boolean;
  limitValues?: boolean;
  possibleValues?: string[];
};

export type MainPage = {
  welcomeTextLine1: string;
  welcomeTextLine2: string;
  enableFiltering: boolean;
  showItemTitle: boolean;
  showItemSubtitle: boolean;
  showItemImg: boolean;
  showRating: boolean;
};

export type DetailsPage = {
  showRating: boolean;
  showComments: boolean;
  showItemDescription: boolean;
  showSubitemTitle: boolean;
  showSubitemSubtitle: boolean;
  reservationConfirmationPrompt: string;
  reservationFailurePrompt: string;
  reservationSummaryPrompt: string;
};

export type StoreConfig = {
  owner: Owner;
  core: Core;
  customAttributesSpec: CustomAttributeSpec[];
  mainPage: MainPage;
  detailsPage: DetailsPage;
};
