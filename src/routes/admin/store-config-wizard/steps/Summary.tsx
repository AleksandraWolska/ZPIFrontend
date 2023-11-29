import { Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useStoreConfig } from "../StoreConfigProvider";
import StepContentWrapper from "./components/StepContentWrapper";
import useAddStoreConfig, {
  removeIdsFromStoreConfig,
} from "../../new-store/useAddStoreConfig";
import useEditStoreConfig from "../../store-settings/useEditStoreConfig";

function Summary() {
  const { storeConfig } = useStoreConfig();
  const addStoreConfig = useAddStoreConfig();
  const editStoreConfig = useEditStoreConfig();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <StepContentWrapper sx={{ wordBreak: "break-all" }}>
      <Box textOverflow="wrap">{JSON.stringify(storeConfig)}</Box>
      <Button
        size="large"
        onClick={() => {
          if (location.pathname.includes("new")) {
            addStoreConfig.mutate(removeIdsFromStoreConfig(storeConfig), {
              onSuccess: () => {
                navigate("/admin");
              },
            });
          } else {
            editStoreConfig.mutate(storeConfig, {
              onSuccess: () => {
                navigate("/admin");
              },
            });
          }
        }}
      >
        Submit
      </Button>
    </StepContentWrapper>
  );
}

export default Summary;
