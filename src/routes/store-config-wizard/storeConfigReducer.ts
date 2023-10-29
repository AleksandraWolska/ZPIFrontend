import { StoreConfigStep, STORE_CONFIG_STEPS } from "./types";
import { StoreConfig } from "../../types";

export const STORE_CONFIG_ACTION_TYPES = {
  SET_OWNER_ATTRIBUTE: "SET_OWNER_ATTRIBUTE",
  APPEND_CORE_ATTRIBUTE: "APPEND_CORE_ATTRIBUTE",
  WITHDRAW_TO_CORE_STEP: "WITHDRAW_TO_CORE_STEP",
  SET_CUSTOM_ATTRIBUTES_SPEC: "SET_CUSTOM_ATTRIBUTES_SPEC",
  SET_MAIN_PAGE_ATTRIBUTE: "SET_MAIN_PAGE_ATTRIBUTE",
  SET_DETAILS_PAGE_ATTRIBUTE: "SET_DETAILS_PAGE_ATTRIBUTE",
  SET_AUTH_CONFIG_ATTRIBUTE: "SET_AUTH_CONFIG_ATTRIBUTE",
} as const;

type SetOwnerAttributeAction = {
  type: typeof STORE_CONFIG_ACTION_TYPES.SET_OWNER_ATTRIBUTE;
  payload: Partial<StoreConfig["owner"]>;
};

type AppendCoreAttributeAction = {
  type: typeof STORE_CONFIG_ACTION_TYPES.APPEND_CORE_ATTRIBUTE;
  payload: StoreConfig["core"];
};

type WithdrawToCoreStepAction = {
  type: typeof STORE_CONFIG_ACTION_TYPES.WITHDRAW_TO_CORE_STEP;
  payload: StoreConfigStep;
};

type SetCustomAttributesSpecAction = {
  type: typeof STORE_CONFIG_ACTION_TYPES.SET_CUSTOM_ATTRIBUTES_SPEC;
  payload: StoreConfig["customAttributesSpec"];
};

type SetMainPageAttributeAction = {
  type: typeof STORE_CONFIG_ACTION_TYPES.SET_MAIN_PAGE_ATTRIBUTE;
  payload: Partial<StoreConfig["mainPage"]>;
};

type SetDetailsPageAttributeAction = {
  type: typeof STORE_CONFIG_ACTION_TYPES.SET_DETAILS_PAGE_ATTRIBUTE;
  payload: Partial<StoreConfig["detailsPage"]>;
};

type SetAuthConfigAttributeAction = {
  type: typeof STORE_CONFIG_ACTION_TYPES.SET_AUTH_CONFIG_ATTRIBUTE;
  payload: Partial<StoreConfig["authConfig"]>;
};

type StoreConfigAction =
  | SetOwnerAttributeAction
  | AppendCoreAttributeAction
  | WithdrawToCoreStepAction
  | SetCustomAttributesSpecAction
  | SetMainPageAttributeAction
  | SetDetailsPageAttributeAction
  | SetAuthConfigAttributeAction;

export function storeConfigReducer(
  storeConfig: StoreConfig,
  action: StoreConfigAction,
): StoreConfig {
  switch (action.type) {
    case STORE_CONFIG_ACTION_TYPES.SET_OWNER_ATTRIBUTE:
      return {
        ...storeConfig,
        owner: { ...storeConfig.owner, ...action.payload },
      };
    case STORE_CONFIG_ACTION_TYPES.APPEND_CORE_ATTRIBUTE:
      return {
        ...storeConfig,
        core: { ...storeConfig.core, ...action.payload },
      };
    case STORE_CONFIG_ACTION_TYPES.WITHDRAW_TO_CORE_STEP:
      return {
        ...storeConfig,
        core: resetCoreConfig(storeConfig.core, action.payload),
      };
    case STORE_CONFIG_ACTION_TYPES.SET_CUSTOM_ATTRIBUTES_SPEC:
      return { ...storeConfig, customAttributesSpec: action.payload };
    case STORE_CONFIG_ACTION_TYPES.SET_MAIN_PAGE_ATTRIBUTE:
      return {
        ...storeConfig,
        mainPage: { ...storeConfig.mainPage, ...action.payload },
      };
    case STORE_CONFIG_ACTION_TYPES.SET_DETAILS_PAGE_ATTRIBUTE:
      return {
        ...storeConfig,
        detailsPage: { ...storeConfig.detailsPage, ...action.payload },
      };
    case STORE_CONFIG_ACTION_TYPES.SET_AUTH_CONFIG_ATTRIBUTE:
      return {
        ...storeConfig,
        authConfig: { ...storeConfig.authConfig, ...action.payload },
      };
    default:
      throw Error("Unknown reducer action!");
  }
}

function resetCoreConfig(
  coreConfig: StoreConfig["core"],
  step: StoreConfigStep,
) {
  switch (step) {
    case STORE_CONFIG_STEPS.FLEXIBILITY:
      return {};
    case STORE_CONFIG_STEPS.GRANULARITY:
      return { flexibility: coreConfig.flexibility };
    case STORE_CONFIG_STEPS.ALLOW_OVER_NIGHT:
      return {
        flexibility: coreConfig.flexibility,
        granularity: coreConfig.granularity,
      };
    case STORE_CONFIG_STEPS.SIMULTANEOUS:
      return {
        flexibility: coreConfig.flexibility,
        ...(coreConfig.granularity !== undefined && {
          granularity: coreConfig.granularity,
          allowOverNight: coreConfig.allowOverNight,
        }),
      };
    case STORE_CONFIG_STEPS.UNIQUENESS:
      return {
        flexibility: coreConfig.flexibility,
        granularity: coreConfig.granularity,
        allowOverNight: coreConfig.allowOverNight,
        simultaneous: coreConfig.simultaneous,
      };
    case STORE_CONFIG_STEPS.SPECIFIC_RESERVATION:
      return {
        flexibility: coreConfig.flexibility,
        simultaneous: coreConfig.simultaneous,
      };
    case STORE_CONFIG_STEPS.PERIODICITY:
      return {
        flexibility: coreConfig.flexibility,
        simultaneous: coreConfig.simultaneous,
        ...(coreConfig.specificReservation !== undefined && {
          specificReservation: coreConfig.specificReservation,
        }),
      };
    default:
      return coreConfig;
  }
}
