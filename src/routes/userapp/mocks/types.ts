// PAGE CONFIG

export type CustomAttributeSpec = {
  id: string;
  name: string;
  dataType: "string" | "number" | "boolean";
  isRequired: boolean;
  isFilterable: boolean;
  possibleValues?: string[];
  showMainPage: boolean;
  showDetailsPage: boolean;
  units?: string; // if type==number
};
export type Owner = {
  name: string;
  logoSrc: string;
  phone: string;
  email: string;
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
  showSubitemTitle?: boolean;
  showSubitemSubtitle?: boolean;
};

export type Core = {
  simultaneous: boolean;
  uniqueness: boolean;
  flexibility: boolean;
  granularity: boolean;
  periodicity: boolean;
  specificReservation: boolean;
};

export type StoreConfig = {
  owner: Owner;
  core: Core;
  mainPage: MainPage;
  detailsPage: DetailsPage;
  customAttributesSpec: CustomAttributeSpec[];
};

// ITEM

export type Comment = {
  id: number;
  userId: number;
  nickname: string;
  content: string;
  datetime: string;
};

export type CustomAttribute = {
  name: string;
  value: string;
};
export type Item = {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  customAttributeList?: CustomAttribute[];
  subitemList?: SubItem[];
  commentList?: Comment[];
  mark?: number;
  availableAmount?: number;
  image?: string;
};

export type SubItem = {
  id: number;
  title: string;
  subtitle?: string;
  availableAmount?: number;
};

export type FilterValues = {
  [key: string]: string | number | boolean;
};

export type FilterValue = {
  attributeKey: string;
  attributeName: string;
  value: string | number | boolean;
};

// TYPES FOR FETCHED DATA

export type FetchedJsonMainPage = {
  data: {
    storeConfig: StoreConfig;
    items: Item[];
  };
};

export type FetchedJsonDetailsPage = {
  data: {
    storeConfig: StoreConfig;
    item: Item;
  };
};
