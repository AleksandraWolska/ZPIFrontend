import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";
import { useStoreConfig } from "../StoreConfigProvider";
import ChangePageButtons from "../../../shared-components/ChangePageButtons";
import { StoreConfig } from "../../../types";

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
    <>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Auth Config
      </Typography>

      <Stack gap={1}>
        <FormControl>
          <FormLabel id="requireAuthForActions">
            Should auth be required for actions (such as reserving or
            commenting)?
          </FormLabel>
          <RadioGroup
            aria-labelledby="requireAuthForActions"
            value={authConfig.requireAuthForActions ? "yes" : "no"}
            onChange={(e) => {
              setAuthConfigAttribute({
                requireAuthForActions: e.target.value === "yes",
              });
            }}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        {authConfig.requireAuthForActions && (
          <FormControl>
            <FormLabel id="requireAuthForStoreAccess">
              Should auth be required for store access?
            </FormLabel>
            <RadioGroup
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
        )}

        {!authConfig.requireAuthForActions && (
          <FormControl>
            <FormLabel>Choose required personal data</FormLabel>
            <FormGroup>
              {personalDataOptions.map(({ value, text }) => {
                return (
                  <FormControlLabel
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
        )}
      </Stack>

      <Box marginTop={2}>
        <ChangePageButtons
          onPrev={() => setActiveStep(STORE_CONFIG_STEPS.DETAILS_PAGE)}
          onNext={() => setActiveStep(STORE_CONFIG_STEPS.PRINT_STORE_CONFIG)}
        />
      </Box>
    </>
  );
}

export default AuthConfig;
