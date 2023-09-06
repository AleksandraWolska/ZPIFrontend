import { ReactNode, useContext, useEffect, useMemo, useReducer } from "react";
import { Granularity, Schema, TimeFrame } from "./types";
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

  const contextValue = useMemo(
    () => ({
      setTimeFrame,
      setGranularity,
    }),
    [],
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
