import { Container } from "@mui/system";
import StoreConfigProvider from "./StoreConfigProvider";
import Stepper from "./Stepper";

function StoreConfigWizard() {
  return (
    <StoreConfigProvider>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          minHeight: "100%",
        }}
      >
        <Stepper />
      </Container>
    </StoreConfigProvider>
  );
}

export default StoreConfigWizard;
