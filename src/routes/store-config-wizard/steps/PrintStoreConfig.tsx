import { useStoreConfig } from "../StoreConfigProvider";

function PrintStoreConfig() {
  const { storeConfig } = useStoreConfig();

  return <div>{JSON.stringify(storeConfig)}</div>;
}

export default PrintStoreConfig;
