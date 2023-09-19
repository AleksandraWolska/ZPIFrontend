import UserAppConfigProvider from "./UserAppConfigProvider";
import Stepper from "./Stepper";

function NewSchema() {
  return (
    <UserAppConfigProvider>
      <Stepper />
    </UserAppConfigProvider>
  );
}

export default NewSchema;
