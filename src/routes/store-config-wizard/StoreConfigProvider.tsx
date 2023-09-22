import { ReactNode, useContext, useEffect, useMemo, useReducer } from "react";
import { StoreConfig, StoreConfigStep } from "./types";
import {
  STORE_CONFIG_ACTION_TYPES,
  storeConfigReducer,
} from "./storeConfigReducer";
import {
  StoreConfigContext,
  StoreConfigContextType,
} from "./StoreConfigContext";

const initialStoreConfig: StoreConfig = {
  layoutConfig: {
    name: "",
    welcomeTextLine1: "",
    welcomeTextLine2: "",
    logoSrc: "",
    showLogo: false,
    enableFiltering: false,
  },
  coreConfig: {},
  attributes: [],
  ratingOptions: {
    allowRating: false,
    showRating: false,
  },
  commentsOptions: {
    allowComments: false,
    showComments: false,
  },
};

function StoreConfigProvider({ children }: { children: ReactNode }) {
  const [storeConfig, dispatch] = useReducer(
    storeConfigReducer,
    initialStoreConfig,
  );

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("STORE-CONFIG:", storeConfig);
  }, [storeConfig]);

  const setLayoutConfig = (layoutConfig: StoreConfig["layoutConfig"]) => {
    dispatch({
      type: STORE_CONFIG_ACTION_TYPES.SET_LAYOUT_CONFIG,
      payload: layoutConfig,
    });
  };

  const setCoreConfigAttribute = (
    key: keyof StoreConfig["coreConfig"],
    value: boolean,
  ) => {
    dispatch({
      type: STORE_CONFIG_ACTION_TYPES.APPEND_TO_CORE_CONFIG,
      payload: { [key]: value },
    });
  };

  const withdrawToCoreConfig = (step: StoreConfigStep) => {
    dispatch({
      type: STORE_CONFIG_ACTION_TYPES.WITHDRAW_TO_CORE_CONFIG,
      payload: step,
    });
  };

  const setAttributes = (attributes: StoreConfig["attributes"]) => {
    dispatch({
      type: STORE_CONFIG_ACTION_TYPES.SET_ATTRIBUTES,
      payload: attributes,
    });
  };

  const setRatingOptions = (
    ratingOptions: Partial<StoreConfig["ratingOptions"]>,
  ) => {
    dispatch({
      type: STORE_CONFIG_ACTION_TYPES.SET_RATING_OPTIONS,
      payload: ratingOptions,
    });
  };

  const setCommentsOptions = (
    commentsOptions: Partial<StoreConfig["commentsOptions"]>,
  ) => {
    dispatch({
      type: STORE_CONFIG_ACTION_TYPES.SET_COMMENTS_OPTIONS,
      payload: commentsOptions,
    });
  };

  const contextValue = useMemo(
    () => ({
      storeConfig,
      setLayoutConfig,
      setCoreConfigAttribute,
      withdrawToCoreConfig,
      setAttributes,
      setRatingOptions,
      setCommentsOptions,
    }),
    [storeConfig],
  );

  return (
    <StoreConfigContext.Provider value={contextValue}>
      {children}
    </StoreConfigContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStoreConfig(): StoreConfigContextType {
  const ctx = useContext(StoreConfigContext);
  if (!ctx) {
    throw Error("StoreConfig context used outside provider!");
  }
  return ctx;
}

export default StoreConfigProvider;
