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
  showSubItemTitle: boolean;
  showSubItemSubtitle: boolean;
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
  id: string;
  name: string;
  value: string | number | boolean;
};

export type SubItem = {
  id: string;
  title: string;
  subtitle: string;
  schedule?: Availability;
  amount?: number;
};

export type SubItemStatus = {
  date?: string;
  availableAmount?: number;
};

export type SubItemInfo = {
  subItem: SubItem;
  subItemStatus: SubItemStatus;
};

export type Comment = {
  id: string;
  userId: string;
  nickname: string;
  content: string;
  datetime: string;
};

type SpecificAvailability = {
  startDateTime: string;
  endDateTime: string;
};

type DailyAvailability = {
  startTime: string;
  endTime: string;
};

type WeeklyAvailability = {
  startDate: string;
  endDate: string;
  weekDays: {
    monday?: DailyAvailability[];
    tuesday?: DailyAvailability[];
    wednesday?: DailyAvailability[];
    thursday?: DailyAvailability[];
    friday?: DailyAvailability[];
    saturday?: DailyAvailability[];
    sunday?: DailyAvailability[];
  };
};

export type Availability = string | SpecificAvailability[] | WeeklyAvailability;

export type Item = {
  id: string;
  active: boolean;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  schedule?: Availability;
  customAttributeList: CustomAttribute[];
  amount?: number;
  subItemList?: SubItem[];
};

export type ItemStatus = {
  date?: string;
  mark?: number;
  availableAmount?: number;
};

export type ItemInfo = {
  item: Omit<Item, "subItemList">;
  itemStatus: ItemStatus;
  subItemsInfo?: SubItemInfo[];
};
