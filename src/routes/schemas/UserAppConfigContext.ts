import { createContext } from "react";
import { UserAppConfig, UserAppConfigStep } from "./types";

export type UserAppConfigContextType = {
  userAppConfig: UserAppConfig;
  setLayoutConfig: (layoutConfig: UserAppConfig["layoutConfig"]) => void;
  setCoreConfigAttribute: (
    key: keyof UserAppConfig["coreConfig"],
    value: boolean,
  ) => void;
  withdrawToCoreConfig: (step: UserAppConfigStep) => void;
  setAttributes: (attributes: UserAppConfig["attributes"]) => void;
  setRatingOptions: (
    ratingOptions: Partial<UserAppConfig["ratingOptions"]>,
  ) => void;
  setCommentsOptions: (
    commentsOptions: Partial<UserAppConfig["commentsOptions"]>,
  ) => void;
};

export const UserAppConfigContext =
  createContext<UserAppConfigContextType | null>(null);
