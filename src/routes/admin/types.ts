import { CustomAttributeSpec, Item, StoreConfig, SubItem } from "../../types";

export type ItemConfig = Pick<StoreConfig, "core" | "customAttributesSpec">;

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

export type ItemWithoutIds = Omit<Item, "id" | "subItems"> & {
  subItems?: Omit<SubItem, "id">[];
};

export type CustomAttributeSpecWithoutId = Omit<CustomAttributeSpec, "id">;

export type StoreConfigWithoutIds = Omit<
  StoreConfig,
  "storeConfigId" | "owner" | "customAttributesSpec"
> & {
  owner: Omit<StoreConfig["owner"], "ownerId">;
  customAttributesSpec: CustomAttributeSpecWithoutId[];
};
