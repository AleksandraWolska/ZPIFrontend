import { useUserAppConfig } from "../UserAppConfigProvider";

function PrintUserAppConfig() {
  const { userAppConfig } = useUserAppConfig();

  return <div>{JSON.stringify(userAppConfig)}</div>;
}

export default PrintUserAppConfig;
