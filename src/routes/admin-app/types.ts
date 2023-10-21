import { Item, StoreConfig, SubItem } from "../../types";

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

export type SubItemOptions = {
  amount?: number;
  schedule?: FixedSchedule;
};

export type SubItemSchema = {
  subItem: SubItem;
  options: SubItemOptions;
};

export type ItemOptions = {
  amount?: number;
  schedule: Schedule;
};

export type ItemSchema = {
  item: Omit<Item, "subItemList"> & {
    subItemList?: SubItemSchema[];
  };
  options: ItemOptions;
};
