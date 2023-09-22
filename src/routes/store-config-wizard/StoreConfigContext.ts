import { createContext } from "react";
import { StoreConfig, StoreConfigStep } from "./types";

export type StoreConfigContextType = {
  storeConfig: StoreConfig;
  setOwnerAttribute: (key: keyof StoreConfig["owner"], value: string) => void;
  appendCoreAttribute: (key: keyof StoreConfig["core"], value: boolean) => void;
  withdrawToCoreStep: (step: StoreConfigStep) => void;
  setCustomAttributesSpec: (
    customAttributesSpec: StoreConfig["customAttributesSpec"],
  ) => void;
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
