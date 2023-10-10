import { Dayjs } from "dayjs";
import { Item, StoreConfig, SubItem } from "../../types";

export type NewItemConfig = Pick<StoreConfig, "core" | "customAttributesSpec">;

export type FixedSchedule = {
  startDateTime: Dayjs;
  endDateTime?: Dayjs;
};

export type ShortSlotsSchedule = {
  scheduleSlots: {
    startDateTime: Dayjs;
    endDateTime: Dayjs;
  }[];
};

export type MultiDaySchedule = {
  startDate: Dayjs;
  endDate: Dayjs;
  reservationStartTime: Dayjs;
  reservationEndTime: Dayjs;
};

export type FreeSchedule = {
  startDateTime: Dayjs;
  endDateTime: Dayjs;
};

export type Schedule =
  | FixedSchedule
  | ShortSlotsSchedule
  | MultiDaySchedule
  | FreeSchedule;

export type NewSubItem = Omit<SubItem, "id">;

export type NewSubItemOptions = {
  amount?: number;
  schedule?: FixedSchedule;
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
  schedule: Schedule;
};

export type NewItemSchema = {
  item: NewItem;
  options: NewItemOptions;
};
