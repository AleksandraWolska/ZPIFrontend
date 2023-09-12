import { Schema, SchemaStep, SCHEMA_STEPS } from "./types";

export const SCHEMA_ACTION_TYPES = {
  APPEND_TO_MECHANICS: "APPEND_TO_MECHANICS",
  WITHDRAW_MECHANICS: "WITHDRAW_MECHANICS",
  SET_CUSTOM_PARAMS: "SET_CUSTOM_PARAMS",
  SET_RATING_OPTIONS: "SET_RATING_OPTIONS",
} as const;

type AppendToMechanicsAction = {
  type: typeof SCHEMA_ACTION_TYPES.APPEND_TO_MECHANICS;
  payload: Schema["mechanics"];
};

type WithdrawMechanicsAction = {
  type: typeof SCHEMA_ACTION_TYPES.WITHDRAW_MECHANICS;
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

type SchemaAction =
  | AppendToMechanicsAction
  | WithdrawMechanicsAction
  | SetCustomParamsAction
  | SetRatingOptionsAction;

export function schemaReducer(schema: Schema, action: SchemaAction): Schema {
  switch (action.type) {
    case SCHEMA_ACTION_TYPES.APPEND_TO_MECHANICS:
      return {
        ...schema,
        mechanics: { ...schema.mechanics, ...action.payload },
      };
    case SCHEMA_ACTION_TYPES.WITHDRAW_MECHANICS:
      return {
        ...schema,
        mechanics: resetMechanics(schema.mechanics, action.payload),
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
    default:
      throw Error("Unknown reducer action!");
  }
}

function resetMechanics(mechanics: Schema["mechanics"], step: SchemaStep) {
  switch (step) {
    case SCHEMA_STEPS.TIME_FRAME:
      return {};
    case SCHEMA_STEPS.GRANULARITY:
      return { timeFrame: mechanics.timeFrame };
    case SCHEMA_STEPS.USERS_PER_OFFER:
      return {
        timeFrame: mechanics.timeFrame,
        ...(mechanics.granularity && { granularity: mechanics.granularity }),
      };
    case SCHEMA_STEPS.ENTITY_UNIQUENESS:
      return {
        timeFrame: mechanics.timeFrame,
        granularity: mechanics.granularity,
        usersPerOffer: mechanics.usersPerOffer,
        ...(mechanics.gapBetween !== undefined && {
          gapBetween: mechanics.gapBetween,
        }),
      };
    case SCHEMA_STEPS.GAP_BETWEEN:
      return {
        timeFrame: mechanics.timeFrame,
        granularity: mechanics.granularity,
        usersPerOffer: mechanics.usersPerOffer,
      };
    case SCHEMA_STEPS.SPECIFIC_SEATS:
      return {
        timeFrame: mechanics.timeFrame,
        usersPerOffer: mechanics.usersPerOffer,
      };
    case SCHEMA_STEPS.PERIODICITY:
      return {
        timeFrame: mechanics.timeFrame,
        usersPerOffer: mechanics.usersPerOffer,
        ...(mechanics.specificSeats !== undefined && {
          specificSeats: mechanics.specificSeats,
        }),
      };
    default:
      return mechanics;
  }
}
