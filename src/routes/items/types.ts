import { Item, StoreConfig, SubItem } from "../../types";

export type NewItemConfig = Pick<StoreConfig, "core" | "customAttributesSpec">;

export type ScheduleMode = "specific" | "weekly";

export type SpecificSchedule = {
  available: {
    startDateTime: string;
    endDateTime: string;
  }[];
  options: {
    granularity: number;
  };
};

export type WeeklySchedule = {
  available: {
    startTime: string;
    endTime: string;
  }[];
  options: {
    startDay: string;
    endDay: string;
    granularity: number;
  };
};

export type Schedule = string | SpecificSchedule | WeeklySchedule;

export type NewSubItem = Omit<SubItem, "id">;

export type NewSubItemOptions = {
  amount?: number;
  schedule?: Schedule;
};

export type NewSubItemSchema = {
  subItem: NewSubItem;
  options: NewSubItemOptions;
};

export type NewItem = Omit<Item, "id" | "subItemList"> & {
  subItemList?: NewSubItemSchema[];
};

export type NewItemOptions = {
  amount?: number;
  schedule?: Schedule;
};

export type NewItemSchema = {
  item: NewItem;
  options: NewItemOptions;
};
