import { createContext } from "react";
import { StoreConfig, StoreConfigStep } from "./types";

export type StoreConfigContextType = {
  storeConfig: StoreConfig;
  setOwnerAttribute: (key: keyof StoreConfig["owner"], value: string) => void;
  setCoreConfigAttribute: (
    key: keyof StoreConfig["coreConfig"],
    value: boolean,
  ) => void;
  withdrawToCoreConfig: (step: StoreConfigStep) => void;
  setAttributes: (attributes: StoreConfig["attributes"]) => void;
  setRatingOptions: (
    ratingOptions: Partial<StoreConfig["ratingOptions"]>,
  ) => void;
  setCommentsOptions: (
    commentsOptions: Partial<StoreConfig["commentsOptions"]>,
  ) => void;
};

export const StoreConfigContext = createContext<StoreConfigContextType | null>(
  null,
);