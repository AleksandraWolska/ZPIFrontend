import { ReactNode, useContext, useEffect, useMemo, useReducer } from "react";
import { Schema, SchemaStep } from "./types";
import { SCHEMA_ACTION_TYPES, schemaReducer } from "./schemaReducer";
import { SchemaContext, SchemaContextType } from "./SchemaContext";

const initialSchema: Schema = {
  mechanics: {},
  customParams: [],
  ratingOptions: {
    allowRating: false,
    showRating: false,
  },
};

function SchemaProvider({ children }: { children: ReactNode }) {
  const [schema, dispatch] = useReducer(schemaReducer, initialSchema);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("SCHEMA", schema);
  }, [schema]);

  const setTimeFrame = (timeFrame: Schema["mechanics"]["timeFrame"]) => {
    dispatch({
      type: SCHEMA_ACTION_TYPES.APPEND_TO_MECHANICS,
      payload: { timeFrame },
    });
  };

  const setGranularity = (granularity: Schema["mechanics"]["granularity"]) => {
    dispatch({
      type: SCHEMA_ACTION_TYPES.APPEND_TO_MECHANICS,
      payload: { granularity },
    });
  };

  const setUsersPerOffer = (
    usersPerOffer: Schema["mechanics"]["usersPerOffer"],
  ) => {
    dispatch({
      type: SCHEMA_ACTION_TYPES.APPEND_TO_MECHANICS,
      payload: { usersPerOffer },
    });
  };

  const setEntityUniqueness = (
    entityUniqueness: Schema["mechanics"]["entityUniqueness"],
  ) => {
    dispatch({
      type: SCHEMA_ACTION_TYPES.APPEND_TO_MECHANICS,
      payload: { entityUniqueness },
    });
  };

  const setGapBetween = (gapBetween: Schema["mechanics"]["gapBetween"]) => {
    dispatch({
      type: SCHEMA_ACTION_TYPES.APPEND_TO_MECHANICS,
      payload: { gapBetween },
    });
  };

  const setSpecificSeats = (
    specificSeats: Schema["mechanics"]["specificSeats"],
  ) => {
    dispatch({
      type: SCHEMA_ACTION_TYPES.APPEND_TO_MECHANICS,
      payload: { specificSeats },
    });
  };

  const setPeriodicity = (periodicity: Schema["mechanics"]["periodicity"]) => {
    dispatch({
      type: SCHEMA_ACTION_TYPES.APPEND_TO_MECHANICS,
      payload: { periodicity },
    });
  };

  const withdrawMechanics = (step: SchemaStep) => {
    dispatch({
      type: SCHEMA_ACTION_TYPES.WITHDRAW_MECHANICS,
      payload: step,
    });
  };

  const setCustomParams = (customParams: Schema["customParams"]) => {
    dispatch({
      type: SCHEMA_ACTION_TYPES.SET_CUSTOM_PARAMS,
      payload: customParams,
    });
  };

  const setRatingOptions = (
    ratingOptions: Partial<Schema["ratingOptions"]>,
  ) => {
    dispatch({
      type: SCHEMA_ACTION_TYPES.SET_RATING_OPTIONS,
      payload: ratingOptions,
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
      withdrawMechanics,
      setCustomParams,
      setRatingOptions,
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
