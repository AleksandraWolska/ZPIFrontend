import { StoreConfig, StoreConfigStep, STORE_CONFIG_STEPS } from "./types";

export const STORE_CONFIG_ACTION_TYPES = {
  SET_OWNER_ATTRIBUTE: "SET_OWNER_ATTRIBUTE",
  APPEND_TO_CORE_CONFIG: "APPEND_TO_CORE_CONFIG",
  WITHDRAW_TO_CORE_CONFIG: "WITHDRAW_TO_CORE_CONFIG",
  SET_ATTRIBUTES: "SET_ATTRIBUTES",
  SET_RATING_OPTIONS: "SET_RATING_OPTIONS",
  SET_COMMENTS_OPTIONS: "SET_COMMENTS_OPTIONS",
} as const;

type SetOwnerAttributeAction = {
  type: typeof STORE_CONFIG_ACTION_TYPES.SET_OWNER_ATTRIBUTE;
  payload: Partial<StoreConfig["owner"]>;
};

type AppendToCoreConfigAction = {
  type: typeof STORE_CONFIG_ACTION_TYPES.APPEND_TO_CORE_CONFIG;
  payload: StoreConfig["coreConfig"];
};

type WithdrawToCoreConfigAction = {
  type: typeof STORE_CONFIG_ACTION_TYPES.WITHDRAW_TO_CORE_CONFIG;
  payload: StoreConfigStep;
};

type SetAttributesAction = {
  type: typeof STORE_CONFIG_ACTION_TYPES.SET_ATTRIBUTES;
  payload: StoreConfig["attributes"];
};

type SetRatingOptionsAction = {
  type: typeof STORE_CONFIG_ACTION_TYPES.SET_RATING_OPTIONS;
  payload: Partial<StoreConfig["ratingOptions"]>;
};

type SetCommentsOptionsAction = {
  type: typeof STORE_CONFIG_ACTION_TYPES.SET_COMMENTS_OPTIONS;
  payload: Partial<StoreConfig["commentsOptions"]>;
};

type StoreConfigAction =
  | SetOwnerAttributeAction
  | AppendToCoreConfigAction
  | WithdrawToCoreConfigAction
  | SetAttributesAction
  | SetRatingOptionsAction
  | SetCommentsOptionsAction;

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
    case STORE_CONFIG_ACTION_TYPES.APPEND_TO_CORE_CONFIG:
      return {
        ...storeConfig,
        coreConfig: { ...storeConfig.coreConfig, ...action.payload },
      };
    case STORE_CONFIG_ACTION_TYPES.WITHDRAW_TO_CORE_CONFIG:
      return {
        ...storeConfig,
        coreConfig: resetCoreConfig(storeConfig.coreConfig, action.payload),
      };
    case STORE_CONFIG_ACTION_TYPES.SET_ATTRIBUTES:
      return { ...storeConfig, attributes: action.payload };
    case STORE_CONFIG_ACTION_TYPES.SET_RATING_OPTIONS:
      return {
        ...storeConfig,
        ratingOptions:
          action.payload.allowRating === false
            ? {
                allowRating: false,
                showRating: false,
              }
            : { ...storeConfig.ratingOptions, ...action.payload },
      };
    case STORE_CONFIG_ACTION_TYPES.SET_COMMENTS_OPTIONS:
      return {
        ...storeConfig,
        commentsOptions:
          action.payload.allowComments === false
            ? {
                allowComments: false,
                showComments: false,
              }
            : { ...storeConfig.commentsOptions, ...action.payload },
      };
    default:
      throw Error("Unknown reducer action!");
  }
}

function resetCoreConfig(
  coreConfig: StoreConfig["coreConfig"],
  step: StoreConfigStep,
) {
  switch (step) {
    case STORE_CONFIG_STEPS.FLEXIBILITY:
      return {};
    case STORE_CONFIG_STEPS.GRANULARITY:
      return { flexibility: coreConfig.flexibility };
    case STORE_CONFIG_STEPS.SIMULTANEOUS:
      return {
        flexibility: coreConfig.flexibility,
        ...(coreConfig.granularity !== undefined && {
          granularity: coreConfig.granularity,
        }),
      };
    case STORE_CONFIG_STEPS.UNIQUENESS:
      return {
        flexibility: coreConfig.flexibility,
        granularity: coreConfig.granularity,
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
