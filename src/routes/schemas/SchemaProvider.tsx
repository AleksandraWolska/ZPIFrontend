import { ReactNode, useContext, useEffect, useMemo, useReducer } from "react";
import { Schema, SchemaStep } from "./types";
import { SCHEMA_ACTION_TYPES, schemaReducer } from "./schemaReducer";
import { SchemaContext, SchemaContextType } from "./SchemaContext";

const initialSchema: Schema = {
  layoutConfig: {
    name: "",
    welcomeTextLine1: "",
    welcomeTextLine2: "",
    logoSrc: "",
    showLogo: false,
    enableFiltering: false,
  },
  coreConfig: {},
  customParams: [],
  ratingOptions: {
    allowRating: false,
    showRating: false,
  },
  commentsOptions: {
    allowComments: false,
    showComments: false,
  },
};

function SchemaProvider({ children }: { children: ReactNode }) {
  const [schema, dispatch] = useReducer(schemaReducer, initialSchema);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("SCHEMA", schema);
  }, [schema]);

  const setLayoutConfig = (layoutConfig: Schema["layoutConfig"]) => {
    dispatch({
      type: SCHEMA_ACTION_TYPES.SET_LAYOUT_CONFIG,
      payload: layoutConfig,
    });
  };

  const setCoreConfigAttribute = (
    key: keyof Schema["coreConfig"],
    value: boolean,
  ) => {
    dispatch({
      type: SCHEMA_ACTION_TYPES.APPEND_TO_CORE_CONFIG,
      payload: { [key]: value },
    });
  };

  const withdrawToCoreConfig = (step: SchemaStep) => {
    dispatch({
      type: SCHEMA_ACTION_TYPES.WITHDRAW_TO_CORE_CONFIG,
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

  const setCommentsOptions = (
    commentsOptions: Partial<Schema["commentsOptions"]>,
  ) => {
    dispatch({
      type: SCHEMA_ACTION_TYPES.SET_COMMENTS_OPTIONS,
      payload: commentsOptions,
    });
  };

  const contextValue = useMemo(
    () => ({
      schema,
      setLayoutConfig,
      setCoreConfigAttribute,
      withdrawToCoreConfig,
      setCustomParams,
      setRatingOptions,
      setCommentsOptions,
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
