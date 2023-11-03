import {
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";
import { useStoreConfig } from "../StoreConfigProvider";
import ChangePageButtons from "../../../shared-components/ChangePageButtons";
import { StoreConfig } from "../../../types";
import StepContentWrapper from "./components/StepContentWrapper";
import WizardStepTitle from "./components/WizardStepTitle";
import WizardStepDescription from "./components/WizardStepDescription";
import BackButton from "./components/BackButton";

const personalDataOptions: {
  value: StoreConfig["authConfig"]["requiredPersonalData"][number];
  text: string;
}[] = [
  {
    value: "name",
    text: "Name",
  },
  {
    value: "surname",
    text: "Surname",
  },
  {
    value: "email",
    text: "Email",
  },
  {
    value: "phone",
    text: "Phone",
  },
  {
    value: "age",
    text: "Age",
  },
];

function AuthConfig({
  setActiveStep,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
}) {
  const { storeConfig, setAuthConfigAttribute } = useStoreConfig();
  const { authConfig } = storeConfig;

  return (
    <StepContentWrapper>
      <BackButton
        onClick={() => setActiveStep(STORE_CONFIG_STEPS.DETAILS_PAGE)}
      />

      <WizardStepTitle>User Authentication</WizardStepTitle>

      <WizardStepDescription>
        Define access permissions for user interactions within your store. For
        actions such as reservation or adding comments, users can either sign in
        to their account or, alternatively, provide specific information that
        you will define as mandatory.
      </WizardStepDescription>

      <Stack gap={3} margin={2.5}>
        <FormControl>
          <FormLabel id="requireAuthForActions">
            Should user be logged in to perform actions (reserving, commenting,
            rating items)?
          </FormLabel>

          <RadioGroup
            sx={{ margin: "auto" }}
            row
            aria-labelledby="requireAuthForActions"
            value={authConfig.requireAuthForActions ? "yes" : "no"}
            onChange={(e) => {
              setAuthConfigAttribute({
                requireAuthForActions: e.target.value === "yes",
              });
              if (e.target.value === "no") {
                setAuthConfigAttribute({
                  requireAuthForStoreAccess: false,
                });
              }
            }}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <Collapse in={!authConfig.requireAuthForActions}>
          <FormControl>
            <FormLabel>Choose required personal data</FormLabel>

            <FormGroup>
              {personalDataOptions.map(({ value, text }) => {
                return (
                  <FormControlLabel
                    key={value}
                    control={
                      <Checkbox
                        checked={authConfig.requiredPersonalData.includes(
                          value,
                        )}
                        onChange={(e) => {
                          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                          e.target.checked
                            ? setAuthConfigAttribute({
                                requiredPersonalData: [
                                  ...authConfig.requiredPersonalData,
                                  value,
                                ],
                              })
                            : setAuthConfigAttribute({
                                requiredPersonalData:
                                  authConfig.requiredPersonalData.filter(
                                    (item) => item !== value,
                                  ),
                              });
                        }}
                      />
                    }
                    label={text}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </Collapse>

        <FormControl disabled={!authConfig.requireAuthForActions}>
          <FormLabel id="requireAuthForStoreAccess">
            Should user be logged in to access store and view items?
          </FormLabel>

          <RadioGroup
            sx={{ margin: "auto" }}
            row
            aria-labelledby="requireAuthForStoreAccess"
            value={authConfig.requireAuthForStoreAccess ? "yes" : "no"}
            onChange={(e) => {
              setAuthConfigAttribute({
                requireAuthForStoreAccess: e.target.value === "yes",
              });
            }}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel id="confirmationRequired">
            Is confirmation by an admin required for reservations?
          </FormLabel>

          <RadioGroup
            sx={{ margin: "auto" }}
            row
            aria-labelledby="confirmationRequired"
            value={authConfig.confirmationRequired ? "yes" : "no"}
            onChange={(e) => {
              setAuthConfigAttribute({
                confirmationRequired: e.target.value === "yes",
              });
            }}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Stack>

      <ChangePageButtons
        onNext={() => setActiveStep(STORE_CONFIG_STEPS.SUMMARY)}
      />
    </StepContentWrapper>
  );
}

export default AuthConfig;
