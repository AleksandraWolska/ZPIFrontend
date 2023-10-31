import { Container } from "@mui/system";
import { Navigate } from "react-router-dom";
import StoreConfigProvider from "./StoreConfigProvider";
import Stepper from "./Stepper";
import useStoreConfig from "../admin-app/useStoreConfig";

function StoreConfigWizard() {
  const storeConfig = useStoreConfig();

  return storeConfig ? (
    <Navigate to="/admin" />
  ) : (
    <StoreConfigProvider>
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

export default StoreConfigWizard;
