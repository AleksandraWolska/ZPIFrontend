import { Schema, TimeFrame, Granularity } from "./types";

export const SCHEMA_ACTION_TYPES = {
  SET_TIME_FRAME: "SET_TIME_FRAME",
  SET_GRANULARITY: "SET_GRANULARITY",
  SET_USERS_PER_OFFER: "SET_USERS_PER_OFFER",
} as const;

type SetTimeFrameAction = {
  type: typeof SCHEMA_ACTION_TYPES.SET_TIME_FRAME;
  payload: TimeFrame;
};

type SetGranularityAction = {
  type: typeof SCHEMA_ACTION_TYPES.SET_GRANULARITY;
  payload: Granularity;
};

type SchemaAction = SetTimeFrameAction | SetGranularityAction;

export function schemaReducer(
  schema: Partial<Schema>,
  action: SchemaAction,
): Partial<Schema> {
  switch (action.type) {
    case SCHEMA_ACTION_TYPES.SET_TIME_FRAME:
      return { ...schema, timeFrame: action.payload };
    case SCHEMA_ACTION_TYPES.SET_GRANULARITY:
      return { ...schema, granularity: action.payload };
    default:
      throw Error("Unknown reducer action!");
  }
}
