import { Box } from "@mui/system";
import { useStoreConfig } from "../StoreConfigProvider";
import { outerFormBox } from "./commonStyles";

function PrintStoreConfig() {
  const { storeConfig } = useStoreConfig();

  return (
    <Box sx={{ ...outerFormBox, wordBreak: "break-all" }}>
      <Box textOverflow="wrap">{JSON.stringify(storeConfig)}</Box>
    </Box>
  );
}

export default PrintStoreConfig;
