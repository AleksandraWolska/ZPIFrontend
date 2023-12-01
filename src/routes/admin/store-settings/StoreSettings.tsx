import { Container } from "@mui/system";
import Stepper from "../store-config-wizard/Stepper";
import StoreConfigProvider from "../store-config-wizard/StoreConfigProvider";
import useStoreConfig from "../store/useStoreConfig";

function StoreSettings() {
  const storeConfig = useStoreConfig();

  return (
    <StoreConfigProvider initialStoreConfig={storeConfig}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stepper />
      </Container>
    </StoreConfigProvider>
  );
}

export default StoreSettings;
