import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStoreConfig } from "../StoreConfigProvider";
import StepContentWrapper from "./components/StepContentWrapper";
import useAddStoreConfig, {
  removeAllIdsFromStoreConfig,
  removeIdsFromStoreConfig,
} from "../useAddStoreConfig";

function Summary() {
  const { storeConfig } = useStoreConfig();
  const addStoreConfig = useAddStoreConfig();
  const navigate = useNavigate();

  return (
    <StepContentWrapper sx={{ wordBreak: "break-all" }}>
      <Box textOverflow="wrap">{JSON.stringify(storeConfig)}</Box>
      <Button
        size="large"
        onClick={() => {
          addStoreConfig.mutate(
            process.env.NODE_ENV === "development"
              ? removeIdsFromStoreConfig(storeConfig)
              : removeAllIdsFromStoreConfig(storeConfig),
            {
              onSuccess: () => {
                navigate("/admin");
              },
            },
          );
        }}
      >
        Submit
      </Button>
    </StepContentWrapper>
  );
}

export default Summary;
