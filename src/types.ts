export type ObjectValues<T> = T[keyof T];

// STORE CONFIG ================================================================
export type Owner = {
  ownerId: string;
  name: string;
  logoSrc: string;
  phone: string;
  email: string;
  color?: OwnerColor;
};

export const OWNER_COLORS = {
  BLUE: "blue",
  LIME: "lime",
  RED: "red",
  GREEN: "green",
  YELLOW: "yellow",
  DEEP_PURPLE: "deepPurple",
  TEAL: "teal",
  AMBER: "amber",
  ORANGE: "orange",
  PINK: "pink",
  LIGHT_GREEN: "lightGreen",
} as const;

export type OwnerColor = ObjectValues<typeof OWNER_COLORS>;

export type Flexibility = boolean;
export type Granularity = boolean;
export type AllowOverNight = boolean;
export type Simultaneous = boolean;
export type Uniqueness = boolean;
export type SpecificReservation = boolean;
export type Periodicity = boolean;
export type Core = {
  flexibility?: Flexibility;
  granularity?: Granularity;
  allowOverNight?: AllowOverNight;
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
  showSubItemTitle: boolean;
  showSubItemSubtitle: boolean;
  reservationConfirmationPrompt: string;
  reservationFailurePrompt: string;
  reservationSummaryPrompt: string;
};

export type AuthConfig = {
  requiredPersonalData: string[];
  confirmationRequired: boolean;
};

export type StoreConfig = {
  storeConfigId: string;
  owner: Owner;
  core: Core;
  customAttributesSpec: CustomAttributeSpec[];
  mainPage: MainPage;
  detailsPage: DetailsPage;
  authConfig: AuthConfig;
};

// ITEM ========================================================================
export type CustomAttribute = {
  id: string;
  name: string;
  value: string | number | boolean;
};

export type Comment = {
  id: string;
  userId?: string;
  itemId: string;
  nickname?: string;
  content?: string;
  rating?: number;
  datetime: string;
};

export type FixedSchedule = {
  startDateTime: string;
  endDateTime?: string;
};

export type FlexibleSchedule = {
  scheduledRanges: {
    startDateTime: string;
    endDateTime: string;
  }[];
};

export type Schedule = FixedSchedule | FlexibleSchedule;

export type Availability = {
  startDateTime: string;
  endDateTime: string;
  type: string;
};

export type SubItem = {
  id: string;
  title: string;
  subtitle: string;
  amount?: number;
  availableAmount?: number;
  schedule?: FixedSchedule;
};

export type Item = {
  id: string;
  ratingCount?: number;
  attributes: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
  };
  customAttributeList: CustomAttribute[];
  amount?: number;
  schedule?: Schedule;
  subItems?: SubItem[];
  active: boolean;
  availableAmount?: number;
  availabilities?: Availability[];
  earliestStartHour?: number;
  latestEndHour?: number;
  mark?: number;
};

// RESERVATION =================================================================
export type Reservation = {
  id: string;
  itemId: string;
  subItemIds?: string[];
  userEmail: string;
  personalData: Record<string, string>;
  confirmed: boolean;
  startDateTime: string;
  endDateTime?: string;
  amount: number;
  message: string;
  status: "active" | "cancelled_by_user" | "cancelled_by_admin" | "past";
};

export type NewReservation = Omit<Reservation, "id">;

export type StoreSummary = {
  storeConfigId: string;
  name: string;
};
