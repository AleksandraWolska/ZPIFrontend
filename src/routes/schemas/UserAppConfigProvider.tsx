import { ReactNode, useContext, useEffect, useMemo, useReducer } from "react";
import { UserAppConfig, UserAppConfigStep } from "./types";
import {
  USER_APP_CONFIG_ACTION_TYPES,
  userAppConfigReducer,
} from "./userAppConfigReducer";
import {
  UserAppConfigContext,
  UserAppConfigContextType,
} from "./UserAppConfigContext";

const initialUserAppConfig: UserAppConfig = {
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

function UserAppConfigProvider({ children }: { children: ReactNode }) {
  const [userAppConfig, dispatch] = useReducer(
    userAppConfigReducer,
    initialUserAppConfig,
  );

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("USER-APP-CONFIG:", userAppConfig);
  }, [userAppConfig]);

  const setLayoutConfig = (layoutConfig: UserAppConfig["layoutConfig"]) => {
    dispatch({
      type: USER_APP_CONFIG_ACTION_TYPES.SET_LAYOUT_CONFIG,
      payload: layoutConfig,
    });
  };

  const setCoreConfigAttribute = (
    key: keyof UserAppConfig["coreConfig"],
    value: boolean,
  ) => {
    dispatch({
      type: USER_APP_CONFIG_ACTION_TYPES.APPEND_TO_CORE_CONFIG,
      payload: { [key]: value },
    });
  };

  const withdrawToCoreConfig = (step: UserAppConfigStep) => {
    dispatch({
      type: USER_APP_CONFIG_ACTION_TYPES.WITHDRAW_TO_CORE_CONFIG,
      payload: step,
    });
  };

  const setAttributes = (attributes: UserAppConfig["attributes"]) => {
    dispatch({
      type: USER_APP_CONFIG_ACTION_TYPES.SET_ATTRIBUTES,
      payload: attributes,
    });
  };

  const setRatingOptions = (
    ratingOptions: Partial<UserAppConfig["ratingOptions"]>,
  ) => {
    dispatch({
      type: USER_APP_CONFIG_ACTION_TYPES.SET_RATING_OPTIONS,
      payload: ratingOptions,
    });
  };

  const setCommentsOptions = (
    commentsOptions: Partial<UserAppConfig["commentsOptions"]>,
  ) => {
    dispatch({
      type: USER_APP_CONFIG_ACTION_TYPES.SET_COMMENTS_OPTIONS,
      payload: commentsOptions,
    });
  };

  const contextValue = useMemo(
    () => ({
      userAppConfig,
      setLayoutConfig,
      setCoreConfigAttribute,
      withdrawToCoreConfig,
      setAttributes,
      setRatingOptions,
      setCommentsOptions,
    }),
    [userAppConfig],
  );

  return (
    <UserAppConfigContext.Provider value={contextValue}>
      {children}
    </UserAppConfigContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUserAppConfig(): UserAppConfigContextType {
  const ctx = useContext(UserAppConfigContext);
  if (!ctx) {
    throw Error("UserAppConfig context used outside provider!");
  }
  return ctx;
}

export default UserAppConfigProvider;
