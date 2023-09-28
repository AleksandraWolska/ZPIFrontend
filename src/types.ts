export type ObjectValues<T> = T[keyof T];

// STORE CONFIG ================================================================
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
  units?: string;
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

// ITEM ========================================================================
export type CustomAttribute = {
  id: number;
  name: string;
  value: string | number | boolean;
};

export type SubItem = {
  id: number;
  title: string;
  subtitle?: string;
  availableAmount?: number;
};

export type Comment = {
  id: number;
  userId: number;
  nickname: string;
  content: string;
  datetime: string;
};

export type Item = {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  customAttributeList: CustomAttribute[];
  subItemList?: SubItem[];
  commentList?: Comment[];
  mark?: number;
  availableAmount?: number;
  image?: string;
};
