import { ReactNode, useContext, useEffect, useMemo, useReducer } from "react";
import {
  Periodicity,
  EntityUniqueness,
  GapBetween,
  Granularity,
  Schema,
  SpecificSeats,
  TimeFrame,
  UsersPerOffer,
} from "./types";
import { SCHEMA_ACTION_TYPES, schemaReducer } from "./schemaReducer";
import { SchemaContext, SchemaContextType } from "./SchemaContext";

const initialSchema: Partial<Schema> = {};

function SchemaProvider({ children }: { children: ReactNode }) {
  const [schema, dispatch] = useReducer(schemaReducer, initialSchema);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("SCHEMA", schema);
  }, [schema]);

  const setTimeFrame = (timeFrame: TimeFrame) => {
    dispatch({ type: SCHEMA_ACTION_TYPES.SET_TIME_FRAME, payload: timeFrame });
  };

  const setGranularity = (granularity: Granularity) => {
    dispatch({
      type: SCHEMA_ACTION_TYPES.SET_GRANULARITY,
      payload: granularity,
    });
  };

  const setUsersPerOffer = (usersPerOffer: UsersPerOffer) => {
    dispatch({
      type: SCHEMA_ACTION_TYPES.SET_USERS_PER_OFFER,
      payload: usersPerOffer,
    });
  };

  const setEntityUniqueness = (entityUniqueness: EntityUniqueness) => {
    dispatch({
      type: SCHEMA_ACTION_TYPES.SET_ENTITY_UNIQUENESS,
      payload: entityUniqueness,
    });
  };

  const setGapBetween = (gapBetween: GapBetween) => {
    dispatch({
      type: SCHEMA_ACTION_TYPES.SET_GAP_BETWEEN,
      payload: gapBetween,
    });
  };

  const setSpecificSeats = (specificSeats: SpecificSeats) => {
    dispatch({
      type: SCHEMA_ACTION_TYPES.SET_SPECIFIC_SEATS,
      payload: specificSeats,
    });
  };

  const setPeriodicity = (periodicity: Periodicity) => {
    dispatch({
      type: SCHEMA_ACTION_TYPES.SET_PERIODICITY,
      payload: periodicity,
    });
  };

  const contextValue = useMemo(
    () => ({
      schema,
      setTimeFrame,
      setGranularity,
      setUsersPerOffer,
      setEntityUniqueness,
      setGapBetween,
      setSpecificSeats,
      setPeriodicity,
    }),
    [schema],
  );

  return (
    <SchemaContext.Provider value={contextValue}>
      {children}
    </SchemaContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSchema(): SchemaContextType {
  const ctx = useContext(SchemaContext);
  if (!ctx) {
    throw Error("Schema context used outside provider!");
  }
  return ctx;
}

export default SchemaProvider;
