import {
  UserAppConfig,
  UserAppConfigStep,
  USER_APP_CONFIG_STEPS,
} from "./types";

export const USER_APP_CONFIG_ACTION_TYPES = {
  SET_LAYOUT_CONFIG: "SET_LAYOUT_CONFIG",
  APPEND_TO_CORE_CONFIG: "APPEND_TO_CORE_CONFIG",
  WITHDRAW_TO_CORE_CONFIG: "WITHDRAW_TO_CORE_CONFIG",
  SET_ATTRIBUTES: "SET_ATTRIBUTES",
  SET_RATING_OPTIONS: "SET_RATING_OPTIONS",
  SET_COMMENTS_OPTIONS: "SET_COMMENTS_OPTIONS",
} as const;

type SetLayoutConfigAction = {
  type: typeof USER_APP_CONFIG_ACTION_TYPES.SET_LAYOUT_CONFIG;
  payload: UserAppConfig["layoutConfig"];
};

type AppendToCoreConfigAction = {
  type: typeof USER_APP_CONFIG_ACTION_TYPES.APPEND_TO_CORE_CONFIG;
  payload: UserAppConfig["coreConfig"];
};

type WithdrawToCoreConfigAction = {
  type: typeof USER_APP_CONFIG_ACTION_TYPES.WITHDRAW_TO_CORE_CONFIG;
  payload: UserAppConfigStep;
};

type SetAttributesAction = {
  type: typeof USER_APP_CONFIG_ACTION_TYPES.SET_ATTRIBUTES;
  payload: UserAppConfig["attributes"];
};

type SetRatingOptionsAction = {
  type: typeof USER_APP_CONFIG_ACTION_TYPES.SET_RATING_OPTIONS;
  payload: Partial<UserAppConfig["ratingOptions"]>;
};

type SetCommentsOptionsAction = {
  type: typeof USER_APP_CONFIG_ACTION_TYPES.SET_COMMENTS_OPTIONS;
  payload: Partial<UserAppConfig["commentsOptions"]>;
};

type UserAppConfigAction =
  | SetLayoutConfigAction
  | AppendToCoreConfigAction
  | WithdrawToCoreConfigAction
  | SetAttributesAction
  | SetRatingOptionsAction
  | SetCommentsOptionsAction;

export function userAppConfigReducer(
  userAppConfig: UserAppConfig,
  action: UserAppConfigAction,
): UserAppConfig {
  switch (action.type) {
    case USER_APP_CONFIG_ACTION_TYPES.SET_LAYOUT_CONFIG:
      return { ...userAppConfig, layoutConfig: action.payload };
    case USER_APP_CONFIG_ACTION_TYPES.APPEND_TO_CORE_CONFIG:
      return {
        ...userAppConfig,
        coreConfig: { ...userAppConfig.coreConfig, ...action.payload },
      };
    case USER_APP_CONFIG_ACTION_TYPES.WITHDRAW_TO_CORE_CONFIG:
      return {
        ...userAppConfig,
        coreConfig: resetCoreConfig(userAppConfig.coreConfig, action.payload),
      };
    case USER_APP_CONFIG_ACTION_TYPES.SET_ATTRIBUTES:
      return { ...userAppConfig, attributes: action.payload };
    case USER_APP_CONFIG_ACTION_TYPES.SET_RATING_OPTIONS:
      return {
        ...userAppConfig,
        ratingOptions:
          action.payload.allowRating === false
            ? {
                allowRating: false,
                showRating: false,
              }
            : { ...userAppConfig.ratingOptions, ...action.payload },
      };
    case USER_APP_CONFIG_ACTION_TYPES.SET_COMMENTS_OPTIONS:
      return {
        ...userAppConfig,
        commentsOptions:
          action.payload.allowComments === false
            ? {
                allowComments: false,
                showComments: false,
              }
            : { ...userAppConfig.commentsOptions, ...action.payload },
      };
    default:
      throw Error("Unknown reducer action!");
  }
}

function resetCoreConfig(
  coreConfig: UserAppConfig["coreConfig"],
  step: UserAppConfigStep,
) {
  switch (step) {
    case USER_APP_CONFIG_STEPS.FLEXIBILITY:
      return {};
    case USER_APP_CONFIG_STEPS.GRANULARITY:
      return { flexibility: coreConfig.flexibility };
    case USER_APP_CONFIG_STEPS.SIMULTANEOUS:
      return {
        flexibility: coreConfig.flexibility,
        ...(coreConfig.granularity !== undefined && {
          granularity: coreConfig.granularity,
        }),
      };
    case USER_APP_CONFIG_STEPS.UNIQUENESS:
      return {
        flexibility: coreConfig.flexibility,
        granularity: coreConfig.granularity,
        simultaneous: coreConfig.simultaneous,
        ...(coreConfig.gapBetween !== undefined && {
          gapBetween: coreConfig.gapBetween,
        }),
      };
    case USER_APP_CONFIG_STEPS.GAP_BETWEEN:
      return {
        flexibility: coreConfig.flexibility,
        granularity: coreConfig.granularity,
        simultaneous: coreConfig.simultaneous,
      };
    case USER_APP_CONFIG_STEPS.SPECIFIC_RESERVATION:
      return {
        flexibility: coreConfig.flexibility,
        simultaneous: coreConfig.simultaneous,
      };
    case USER_APP_CONFIG_STEPS.PERIODICITY:
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
