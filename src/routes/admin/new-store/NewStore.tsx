import { Container } from "@mui/system";
import Stepper from "../store-config-wizard/Stepper";
import StoreConfigProvider from "../store-config-wizard/StoreConfigProvider";

function NewStore() {
  return (
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

export default NewStore;
