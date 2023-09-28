import { ReactNode, useContext, useEffect, useMemo, useReducer } from "react";
import { StoreConfigStep } from "./types";
import {
  STORE_CONFIG_ACTION_TYPES,
  storeConfigReducer,
} from "./storeConfigReducer";
import {
  StoreConfigContext,
  StoreConfigContextType,
} from "./StoreConfigContext";
import { StoreConfig } from "../../types";

const initialStoreConfig: StoreConfig = {
  owner: {
    name: "",
    logoSrc: "",
    phone: "",
    email: "",
  },
  core: {},
  customAttributesSpec: [],
  mainPage: {
    welcomeTextLine1: "",
    welcomeTextLine2: "",
    enableFiltering: false,
    showItemTitle: false,
    showItemSubtitle: false,
    showItemImg: false,
    showRating: false,
  },
  detailsPage: {
    showRating: false,
    showComments: false,
    showItemDescription: false,
    showSubitemTitle: false,
    showSubitemSubtitle: false,
    reservationConfirmationPrompt: "",
    reservationFailurePrompt: "",
    reservationSummaryPrompt: "",
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

  const setOwnerAttribute = (
    key: keyof StoreConfig["owner"],
    value: string,
  ) => {
    dispatch({
      type: STORE_CONFIG_ACTION_TYPES.SET_OWNER_ATTRIBUTE,
      payload: { [key]: value },
    });
  };

  const appendCoreAttribute = (
    key: keyof StoreConfig["core"],
    value: boolean,
  ) => {
    dispatch({
      type: STORE_CONFIG_ACTION_TYPES.APPEND_CORE_ATTRIBUTE,
      payload: { [key]: value },
    });
  };

  const withdrawToCoreStep = (step: StoreConfigStep) => {
    dispatch({
      type: STORE_CONFIG_ACTION_TYPES.WITHDRAW_TO_CORE_STEP,
      payload: step,
    });
  };

  const setCustomAttributesSpec = (
    customAttributesSpec: StoreConfig["customAttributesSpec"],
  ) => {
    dispatch({
      type: STORE_CONFIG_ACTION_TYPES.SET_CUSTOM_ATTRIBUTES_SPEC,
      payload: customAttributesSpec,
    });
  };

  const setMainPageAttribute = (
    key: keyof StoreConfig["mainPage"],
    value: StoreConfig["mainPage"][typeof key],
  ) => {
    dispatch({
      type: STORE_CONFIG_ACTION_TYPES.SET_MAIN_PAGE_ATTRIBUTE,
      payload: { [key]: value },
    });
  };

  const setDetailsPageAttribute = (
    key: keyof StoreConfig["detailsPage"],
    value: StoreConfig["detailsPage"][typeof key],
  ) => {
    dispatch({
      type: STORE_CONFIG_ACTION_TYPES.SET_DETAILS_PAGE_ATTRIBUTE,
      payload: { [key]: value },
    });
  };

  const contextValue = useMemo(
    () => ({
      storeConfig,
      setOwnerAttribute,
      appendCoreAttribute,
      withdrawToCoreStep,
      setCustomAttributesSpec,
      setMainPageAttribute,
      setDetailsPageAttribute,
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
