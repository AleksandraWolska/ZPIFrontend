import {
  Schema,
  TimeFrame,
  Granularity,
  UsersPerOffer,
  GapBetween,
  EntityUniqueness,
  SpecificSeats,
  Periodicity,
} from "./types";

export const SCHEMA_ACTION_TYPES = {
  SET_TIME_FRAME: "SET_TIME_FRAME",
  SET_GRANULARITY: "SET_GRANULARITY",
  SET_USERS_PER_OFFER: "SET_USERS_PER_OFFER",
  SET_ENTITY_UNIQUENESS: "SET_ENTITY_UNIQUENESS",
  SET_GAP_BETWEEN: "SET_GAP_BETWEEN",
  SET_SPECIFIC_SEATS: "SET_SPECIFIC_SEATS",
  SET_PERIODICITY: "SET_PERIODICITY",
} as const;

type SetTimeFrameAction = {
  type: typeof SCHEMA_ACTION_TYPES.SET_TIME_FRAME;
  payload: TimeFrame;
};

type SetGranularityAction = {
  type: typeof SCHEMA_ACTION_TYPES.SET_GRANULARITY;
  payload: Granularity;
};

type SetUsersPerOfferAction = {
  type: typeof SCHEMA_ACTION_TYPES.SET_USERS_PER_OFFER;
  payload: UsersPerOffer;
};

type SetEntityUniquenessAction = {
  type: typeof SCHEMA_ACTION_TYPES.SET_ENTITY_UNIQUENESS;
  payload: EntityUniqueness;
};

type SetGapBetweenAction = {
  type: typeof SCHEMA_ACTION_TYPES.SET_GAP_BETWEEN;
  payload: GapBetween;
};

type SetSpecificSeatsAction = {
  type: typeof SCHEMA_ACTION_TYPES.SET_SPECIFIC_SEATS;
  payload: SpecificSeats;
};

type SetPeriodicityAction = {
  type: typeof SCHEMA_ACTION_TYPES.SET_PERIODICITY;
  payload: Periodicity;
};

type SchemaAction =
  | SetTimeFrameAction
  | SetGranularityAction
  | SetUsersPerOfferAction
  | SetEntityUniquenessAction
  | SetGapBetweenAction
  | SetSpecificSeatsAction
  | SetPeriodicityAction;

export function schemaReducer(
  schema: Partial<Schema>,
  action: SchemaAction,
): Partial<Schema> {
  switch (action.type) {
    case SCHEMA_ACTION_TYPES.SET_TIME_FRAME:
      return { ...schema, timeFrame: action.payload };
    case SCHEMA_ACTION_TYPES.SET_GRANULARITY:
      return { ...schema, granularity: action.payload };
    case SCHEMA_ACTION_TYPES.SET_USERS_PER_OFFER:
      return { ...schema, usersPerOffer: action.payload };
    case SCHEMA_ACTION_TYPES.SET_ENTITY_UNIQUENESS:
      return { ...schema, entityUniqueness: action.payload };
    case SCHEMA_ACTION_TYPES.SET_GAP_BETWEEN:
      return { ...schema, gapBetween: action.payload };
    case SCHEMA_ACTION_TYPES.SET_SPECIFIC_SEATS:
      return { ...schema, specificSeats: action.payload };
    case SCHEMA_ACTION_TYPES.SET_PERIODICITY:
      return { ...schema, periodicity: action.payload };
    default:
      throw Error("Unknown reducer action!");
  }
}
