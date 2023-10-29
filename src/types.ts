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
  requireAuthForActions: boolean;
  requireAuthForStoreAccess: boolean;
  requiredPersonalData: ("name" | "surname" | "email" | "phone" | "age")[];
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

export type SubItem = {
  id: string;
  title: string;
  subtitle: string;
  amount?: number; // temp
};

export type SubItemStatus = {
  schedule?: Availability;
  availableAmount?: number;
};

export type SubItemInfo = {
  subItem: SubItem;
  subItemStatus: SubItemStatus;
};

export type Comment = {
  id: string;
  userId?: string;
  nickname?: string;
  content?: string;
  rating?: number;
  datetime: string;
};

export type FixedAvailability = {
  startDateTime: string;
  endDateTime?: string;
};

export type SpecificAvailability = {
  startDateTime: string;
  endDateTime: string;
  type: string;
};

export type SlotsAvailability = {
  slots: {
    startDateTime: string;
    endDateTime: string;
    isAvailable: boolean;
  }[];
};

export type ContinuousAvailability = {
  ranges: {
    startDateTime: string;
    endDateTime: string;
    isAvailable: boolean;
  }[];
};

export type Availability =
  | FixedAvailability
  | SlotsAvailability
  | ContinuousAvailability
  | SpecificAvailability[];

export type Item = {
  id: string;
  active: boolean;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  customAttributeList: CustomAttribute[];
  subItemList?: SubItem[];
  amount?: number; // temp
  mark?: number; // temp
};

export type ItemStatus = {
  schedule?: Availability;
  mark?: number;
  availableAmount?: number;
};

export type ItemInfo = {
  item: Omit<Item, "subItemList"> & {
    subItemInfoList?: SubItemInfo[];
  };
  itemStatus: ItemStatus;
};
