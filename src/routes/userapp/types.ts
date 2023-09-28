import { Item, StoreConfig } from "../../types";

export type FilterValue = {
  attributeKey: string;
  attributeName: string;
  value: string | number | boolean;
};

export type FetchedJsonDetailsPage = {
  data: {
    storeConfig: StoreConfig;
    item: Item;
  };
};

export type MainPageConfig = Pick<
  StoreConfig,
  "customAttributesSpec" | "mainPage"
>;
