import StoreConfigProvider from "./StoreConfigProvider";
import Stepper from "./Stepper";

function StoreConfigWizard() {
  return (
    <StoreConfigProvider>
      <Stepper />
    </StoreConfigProvider>
  );
}

export default StoreConfigWizard;
