import { Box } from "@mui/system";
import { useStoreConfig } from "../StoreConfigProvider";
import StepContentWrapper from "./components/StepContentWrapper";

function PrintStoreConfig() {
  const { storeConfig } = useStoreConfig();

  return (
    <StepContentWrapper sx={{ wordBreak: "break-all" }}>
      <Box textOverflow="wrap">{JSON.stringify(storeConfig)}</Box>
    </StepContentWrapper>
  );
}

export default PrintStoreConfig;
