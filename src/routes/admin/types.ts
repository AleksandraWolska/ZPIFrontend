import { CustomAttributeSpec, Item, StoreConfig, SubItem } from "../../types";

export type ItemConfig = Pick<StoreConfig, "core" | "customAttributesSpec">;

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

// export type SubItemInitialStatus = {
//   amount?: number;
//   schedule?: FixedSchedule;
// };

// export type EnhancedSubItem = {
//   subItem: SubItem;
//   initialStatus: SubItemInitialStatus;
// };
//
// export type ItemInitialStatus = {
//   amount?: number;
//   schedule: Schedule;
// };

// export type EnhancedItem = {
//   item: Omit<Item, "subItemList"> & {
//     subItemList?: EnhancedSubItem[];
//   };
//   initialStatus: ItemInitialStatus;
// };

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
