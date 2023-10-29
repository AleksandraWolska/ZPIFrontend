import { createContext } from "react";
import { StoreConfigStep } from "./types";
import { StoreConfig } from "../../types";

export type StoreConfigContextType = {
  storeConfig: StoreConfig;
  setOwnerAttribute: (key: keyof StoreConfig["owner"], value: string) => void;
  appendCoreAttribute: (key: keyof StoreConfig["core"], value: boolean) => void;
  withdrawToCoreStep: (step: StoreConfigStep) => void;
  setCustomAttributesSpec: (
    customAttributesSpec: StoreConfig["customAttributesSpec"],
  ) => void;
  setMainPageAttribute: (
    key: keyof StoreConfig["mainPage"],
    value: StoreConfig["mainPage"][typeof key],
  ) => void;
  setDetailsPageAttribute: (
    key: keyof StoreConfig["detailsPage"],
    value: StoreConfig["detailsPage"][typeof key],
  ) => void;
  setAuthConfigAttribute: (attr: Partial<StoreConfig["authConfig"]>) => void;
};

export const StoreConfigContext = createContext<StoreConfigContextType | null>(
  null,
);
