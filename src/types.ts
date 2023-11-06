export type ObjectValues<T> = T[keyof T];

// STORE CONFIG ================================================================
export type Owner = {
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
  isPrivate: boolean;
  whiteList?: string[];
};

export type StoreConfig = {
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
  nickname?: string;
  content?: string;
  rating?: number;
  datetime: string;
};

export type FixedSchedule = {
  startDateTime: string;
  endDateTime?: string;
};

export type SlotsSchedule = {
  scheduledSlots: {
    startDateTime: string;
    endDateTime: string;
  }[];
};

export type ContinuousSchedule = {
  scheduledRanges: {
    startDateTime: string;
    endDateTime: string;
  }[];
};

export type Schedule = FixedSchedule | SlotsSchedule | ContinuousSchedule;

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
  attributes: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
  };
  customAttributeList: CustomAttribute[];
  initialSettings: {
    amount?: number;
    schedule?: Schedule;
  };
  subItems?: SubItem[];
  status: {
    active: boolean;
    availableAmount?: number;
    availability?: Availability[];
    mark?: number;
  };
};
