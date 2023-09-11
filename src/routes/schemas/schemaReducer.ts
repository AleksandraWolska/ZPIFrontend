import { Schema, SchemaStep, SCHEMA_STEPS, CustomParam } from "./types";

export const SCHEMA_ACTION_TYPES = {
  APPEND_TO_SCHEMA: "APPEND_TO_SCHEMA",
  WITHDRAW: "WITHDRAW",
  SET_CUSTOM_PARAMS: "SET_CUSTOM_PARAMS",
} as const;

type AppendToSchemaAction = {
  type: typeof SCHEMA_ACTION_TYPES.APPEND_TO_SCHEMA;
  payload: Partial<Schema>;
};

type WithdrawAction = {
  type: typeof SCHEMA_ACTION_TYPES.WITHDRAW;
  payload: SchemaStep;
};

type SetCustomParamsAction = {
  type: typeof SCHEMA_ACTION_TYPES.SET_CUSTOM_PARAMS;
  payload: CustomParam[];
};

type SchemaAction =
  | AppendToSchemaAction
  | WithdrawAction
  | SetCustomParamsAction;

export function schemaReducer(
  schema: Partial<Schema>,
  action: SchemaAction,
): Partial<Schema> {
  switch (action.type) {
    case SCHEMA_ACTION_TYPES.APPEND_TO_SCHEMA:
      return { ...schema, ...action.payload };
    case SCHEMA_ACTION_TYPES.WITHDRAW:
      return {
        ...resetCoreAttributes(schema, action.payload),
        customParams: schema.customParams,
      };
    case SCHEMA_ACTION_TYPES.SET_CUSTOM_PARAMS:
      return { ...schema, customParams: action.payload };
    default:
      throw Error("Unknown reducer action!");
  }
}

function resetCoreAttributes(schema: Partial<Schema>, step: SchemaStep) {
  switch (step) {
    case SCHEMA_STEPS.TIME_FRAME:
      return {};
    case SCHEMA_STEPS.GRANULARITY:
      return { timeFrame: schema.timeFrame };
    case SCHEMA_STEPS.USERS_PER_OFFER:
      return {
        timeFrame: schema.timeFrame,
        ...(schema.granularity && { granularity: schema.granularity }),
      };
    case SCHEMA_STEPS.ENTITY_UNIQUENESS:
      return {
        timeFrame: schema.timeFrame,
        granularity: schema.granularity,
        usersPerOffer: schema.usersPerOffer,
        ...(schema.gapBetween && { gapBetween: schema.gapBetween }),
      };
    case SCHEMA_STEPS.GAP_BETWEEN:
      return {
        timeFrame: schema.timeFrame,
        granularity: schema.granularity,
        usersPerOffer: schema.usersPerOffer,
      };
    case SCHEMA_STEPS.SPECIFIC_SEATS:
      return {
        timeFrame: schema.timeFrame,
        usersPerOffer: schema.usersPerOffer,
      };
    case SCHEMA_STEPS.PERIODICITY:
      return {
        timeFrame: schema.timeFrame,
        usersPerOffer: schema.usersPerOffer,
        ...(schema.specificSeats && { specificSeats: schema.specificSeats }),
      };
    default:
      return schema;
  }
}
