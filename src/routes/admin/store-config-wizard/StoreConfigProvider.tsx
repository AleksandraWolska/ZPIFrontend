import { ReactNode, useContext, useEffect, useMemo, useReducer } from "react";
import { v4 as uuid } from "uuid";
import { StoreConfigStep } from "./types";
import {
  STORE_CONFIG_ACTION_TYPES,
  storeConfigReducer,
} from "./storeConfigReducer";
import {
  StoreConfigContext,
  StoreConfigContextType,
} from "./StoreConfigContext";
import { OWNER_COLORS, StoreConfig } from "../../../types";

const defaultStoreConfig: StoreConfig = {
  storeConfigId: uuid(),
  owner: {
    ownerId: uuid(),
    name: "",
    logoSrc: "",
    phone: "",
    email: "",
    color: OWNER_COLORS.BLUE,
  },
  core: {},
  customAttributesSpec: [],
  mainPage: {
    welcomeTextLine1: "",
    welcomeTextLine2: "",
    enableFiltering: true,
    showItemTitle: true,
    showItemSubtitle: true,
    showItemImg: true,
    showRating: true,
  },
  detailsPage: {
    showRating: true,
    showComments: true,
    showItemDescription: true,
    showSubItemTitle: true,
    showSubItemSubtitle: true,
    reservationConfirmationPrompt: "",
    reservationFailurePrompt: "",
    reservationSummaryPrompt: "",
  },
  authConfig: {
    requiredPersonalData: [],
    confirmationRequired: false,
  },
};

function StoreConfigProvider({
  children,
  initialStoreConfig = defaultStoreConfig,
}: {
  children: ReactNode;
  initialStoreConfig?: StoreConfig;
}) {
  const [storeConfig, dispatch] = useReducer(
    storeConfigReducer,
    initialStoreConfig,
  );

  useEffect(() => {
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

  const setAuthConfigAttribute = (attr: Partial<StoreConfig["authConfig"]>) => {
    dispatch({
      type: STORE_CONFIG_ACTION_TYPES.SET_AUTH_CONFIG_ATTRIBUTE,
      payload: attr,
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
      setAuthConfigAttribute,
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
