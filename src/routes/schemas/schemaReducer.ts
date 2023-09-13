import { Schema, SchemaStep, SCHEMA_STEPS } from "./types";

export const SCHEMA_ACTION_TYPES = {
  APPEND_TO_CORE_CONFIG: "APPEND_TO_CORE_CONFIG",
  WITHDRAW_TO_CORE_CONFIG: "WITHDRAW_TO_CORE_CONFIG",
  SET_CUSTOM_PARAMS: "SET_CUSTOM_PARAMS",
  SET_RATING_OPTIONS: "SET_RATING_OPTIONS",
  SET_COMMENTS_OPTIONS: "SET_COMMENTS_OPTIONS",
} as const;

type AppendToCoreConfigAction = {
  type: typeof SCHEMA_ACTION_TYPES.APPEND_TO_CORE_CONFIG;
  payload: Schema["coreConfig"];
};

type WithdrawToCoreConfigAction = {
  type: typeof SCHEMA_ACTION_TYPES.WITHDRAW_TO_CORE_CONFIG;
  payload: SchemaStep;
};

type SetCustomParamsAction = {
  type: typeof SCHEMA_ACTION_TYPES.SET_CUSTOM_PARAMS;
  payload: Schema["customParams"];
};

type SetRatingOptionsAction = {
  type: typeof SCHEMA_ACTION_TYPES.SET_RATING_OPTIONS;
  payload: Partial<Schema["ratingOptions"]>;
};

type SetCommentsOptionsAction = {
  type: typeof SCHEMA_ACTION_TYPES.SET_COMMENTS_OPTIONS;
  payload: Partial<Schema["commentsOptions"]>;
};

type SchemaAction =
  | AppendToCoreConfigAction
  | WithdrawToCoreConfigAction
  | SetCustomParamsAction
  | SetRatingOptionsAction
  | SetCommentsOptionsAction;

export function schemaReducer(schema: Schema, action: SchemaAction): Schema {
  switch (action.type) {
    case SCHEMA_ACTION_TYPES.APPEND_TO_CORE_CONFIG:
      return {
        ...schema,
        coreConfig: { ...schema.coreConfig, ...action.payload },
      };
    case SCHEMA_ACTION_TYPES.WITHDRAW_TO_CORE_CONFIG:
      return {
        ...schema,
        coreConfig: resetCoreConfig(schema.coreConfig, action.payload),
      };
    case SCHEMA_ACTION_TYPES.SET_CUSTOM_PARAMS:
      return { ...schema, customParams: action.payload };
    case SCHEMA_ACTION_TYPES.SET_RATING_OPTIONS:
      return {
        ...schema,
        ratingOptions:
          action.payload.allowRating === false
            ? {
                allowRating: false,
                showRating: false,
              }
            : { ...schema.ratingOptions, ...action.payload },
      };
    case SCHEMA_ACTION_TYPES.SET_COMMENTS_OPTIONS:
      return {
        ...schema,
        commentsOptions:
          action.payload.allowComments === false
            ? {
                allowComments: false,
                showComments: false,
              }
            : { ...schema.commentsOptions, ...action.payload },
      };
    default:
      throw Error("Unknown reducer action!");
  }
}

function resetCoreConfig(coreConfig: Schema["coreConfig"], step: SchemaStep) {
  switch (step) {
    case SCHEMA_STEPS.FLEXIBILITY:
      return {};
    case SCHEMA_STEPS.GRANULARITY:
      return { flexibility: coreConfig.flexibility };
    case SCHEMA_STEPS.SIMULTANEOUS:
      return {
        flexibility: coreConfig.flexibility,
        ...(coreConfig.granularity !== undefined && {
          granularity: coreConfig.granularity,
        }),
      };
    case SCHEMA_STEPS.UNIQUENESS:
      return {
        flexibility: coreConfig.flexibility,
        granularity: coreConfig.granularity,
        simultaneous: coreConfig.simultaneous,
        ...(coreConfig.gapBetween !== undefined && {
          gapBetween: coreConfig.gapBetween,
        }),
      };
    case SCHEMA_STEPS.GAP_BETWEEN:
      return {
        flexibility: coreConfig.flexibility,
        granularity: coreConfig.granularity,
        simultaneous: coreConfig.simultaneous,
      };
    case SCHEMA_STEPS.SPECIFIC_RESERVATION:
      return {
        flexibility: coreConfig.flexibility,
        simultaneous: coreConfig.simultaneous,
      };
    case SCHEMA_STEPS.PERIODICITY:
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
