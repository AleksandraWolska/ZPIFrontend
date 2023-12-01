import { useState } from "react";
import { v4 as uuid } from "uuid";
import {
  Autocomplete,
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";
import { useStoreConfig } from "../StoreConfigProvider";
import ChangePageButtons from "../../components/ChangePageButtons";
import { CustomAttributeSpec, StoreConfig } from "../../../../types";
import StepContentWrapper from "./components/StepContentWrapper";
import WizardStepTitle from "./components/WizardStepTitle";
import WizardStepDescription from "./components/WizardStepDescription";
import BackButton from "./components/BackButton";

const defaultCustomAttributeSpec: Omit<CustomAttributeSpec, "id"> = {
  name: "",
  dataType: "string",
  isRequired: false,
  isFilterable: false,
  showMainPage: false,
  showDetailsPage: false,
  limitValues: false,
  possibleValues: [],
};

function getInitialLocalAttributesSpec(
  originalAttributesSpec: CustomAttributeSpec[],
) {
  return originalAttributesSpec.length
    ? [...originalAttributesSpec, { id: uuid(), ...defaultCustomAttributeSpec }]
    : [{ id: uuid(), ...defaultCustomAttributeSpec }];
}

function CustomAttributesSpec({
  setActiveStep,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
}) {
  const { t } = useTranslation();

  const { storeConfig, withdrawToCoreStep, setCustomAttributesSpec } =
    useStoreConfig();
  const location = useLocation();

  const initialLocalAttributesSpec = getInitialLocalAttributesSpec(
    storeConfig.customAttributesSpec,
  );
  const [localAttributesSpec, setLocalAttributesSpec] = useState<
    StoreConfig["customAttributesSpec"]
  >(initialLocalAttributesSpec);
  const lastIdx = localAttributesSpec.length - 1;

  const updateLocalAttributeSpec = (
    id: string,
    attribute: Partial<CustomAttributeSpec>,
  ) => {
    setLocalAttributesSpec((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...attribute } : p)),
    );
  };

  const saveCustomAttributesSpec = () => {
    const filteredParams = localAttributesSpec
      .filter((p) => p.name !== "")
      .map((p) => {
        const { limitValues, possibleValues, ...rest } = p;
        return p.dataType === "string" ? p : rest;
      });
    setCustomAttributesSpec(filteredParams);
  };

  return (
    <StepContentWrapper>
      <BackButton
        onClick={() => {
          saveCustomAttributesSpec();
          if (location.pathname.includes("new")) {
            let prevStep;
            if (storeConfig.core.periodicity !== undefined)
              prevStep = STORE_CONFIG_STEPS.PERIODICITY;
            else if (storeConfig.core.specificReservation !== undefined)
              prevStep = STORE_CONFIG_STEPS.SPECIFIC_RESERVATION;
            else if (storeConfig.core.uniqueness !== undefined)
              prevStep = STORE_CONFIG_STEPS.UNIQUENESS;
            else prevStep = STORE_CONFIG_STEPS.SIMULTANEOUS;

            withdrawToCoreStep(prevStep);
            setActiveStep(prevStep);
          } else {
            setActiveStep(STORE_CONFIG_STEPS.GENERAL_STORE_INFO);
          }
        }}
      />

      <WizardStepTitle>
        {t("admin.wizard.customAttributes.title")}
      </WizardStepTitle>

      <WizardStepDescription>
        {t("admin.wizard.customAttributes.desc")}
      </WizardStepDescription>

      <Box width="100%" padding={2.5}>
        {localAttributesSpec.map((attr, idx) => {
          const disabled = attr.name === "";

          return (
            <Box key={attr.id}>
              <Divider sx={{ marginTop: 4, marginBottom: 4 }} />

              <Stack direction="row" gap={1} marginBottom={1.25}>
                <TextField
                  value={attr.name}
                  sx={{ width: "60%" }}
                  label={t("admin.wizard.customAttributes.name")}
                  onChange={(e) => {
                    updateLocalAttributeSpec(attr.id, { name: e.target.value });
                    if (idx === lastIdx) {
                      setLocalAttributesSpec((prev) => [
                        ...prev,
                        { id: uuid(), ...defaultCustomAttributeSpec },
                      ]);
                    }
                  }}
                />
                <FormControl size="small" variant="outlined" fullWidth>
                  <InputLabel id="Attribute Type">Attribute Type</InputLabel>
                  <Select
                    value={attr.dataType}
                    label={t("admin.wizard.customAttributes.type")}
                    sx={{ width: "35%" }}
                    onChange={(e) => {
                      const val = e.target
                        .value as CustomAttributeSpec["dataType"];
                      updateLocalAttributeSpec(attr.id, { dataType: val });
                    }}
                    disabled={disabled}
                  >
                    <MenuItem value="string">
                      {t("admin.wizard.customAttributes.string")}
                    </MenuItem>
                    <MenuItem value="number">
                      {t("admin.wizard.customAttributes.number")}
                    </MenuItem>
                    <MenuItem value="boolean">
                      {t("admin.wizard.customAttributes.boolean")}
                    </MenuItem>
                  </Select>
                </FormControl>
                <IconButton
                  sx={{
                    width: "5%",
                  }}
                  onClick={() => {
                    setLocalAttributesSpec((prev) =>
                      prev.filter((p) => p.id !== attr.id),
                    );
                  }}
                  disabled={idx === lastIdx}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>

              <FormGroup
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={attr.isRequired}
                      onChange={(e) => {
                        updateLocalAttributeSpec(attr.id, {
                          isRequired: e.target.checked,
                        });
                      }}
                    />
                  }
                  label={t("admin.wizard.customAttributes.required")}
                  disabled={disabled}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={attr.isFilterable}
                      onChange={(e) => {
                        updateLocalAttributeSpec(attr.id, {
                          isFilterable: e.target.checked,
                        });
                      }}
                    />
                  }
                  label={t("admin.wizard.customAttributes.filterable")}
                  disabled={disabled}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={attr.showMainPage}
                      onChange={(e) => {
                        updateLocalAttributeSpec(attr.id, {
                          showMainPage: e.target.checked,
                        });
                      }}
                    />
                  }
                  label={t("admin.wizard.customAttributes.mainPage")}
                  disabled={disabled}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={attr.showDetailsPage || false}
                      onChange={(e) => {
                        updateLocalAttributeSpec(attr.id, {
                          showDetailsPage: e.target.checked,
                        });
                      }}
                    />
                  }
                  label={t("admin.wizard.customAttributes.detailsPage")}
                  disabled={disabled}
                />
              </FormGroup>

              {attr.dataType === "string" && (
                <Stack
                  direction="row"
                  sx={{ alignItems: "center", marginTop: 1.25 }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={attr.limitValues}
                        onChange={(e) => {
                          updateLocalAttributeSpec(attr.id, {
                            limitValues: e.target.checked,
                          });
                        }}
                      />
                    }
                    label={t("admin.wizard.customAttributes.predefinedValues")}
                    disabled={disabled}
                  />

                  <Autocomplete
                    multiple
                    freeSolo
                    fullWidth
                    onChange={(_e, values) => {
                      updateLocalAttributeSpec(attr.id, {
                        possibleValues: values as string[],
                      });
                    }}
                    options={[]}
                    value={attr.possibleValues || []}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t(
                          "admin.wizard.customAttributes.predefinedValuesLabel",
                        )}
                        placeholder={t(
                          "admin.wizard.customAttributes.predefinedValuePlaceholder",
                        )}
                        size="medium"
                      />
                    )}
                    disabled={disabled || !attr.limitValues}
                  />
                </Stack>
              )}
            </Box>
          );
        })}
      </Box>

      <ChangePageButtons
        onNext={() => {
          saveCustomAttributesSpec();
          setActiveStep(STORE_CONFIG_STEPS.MAIN_PAGE);
        }}
      />
    </StepContentWrapper>
  );
}

export default CustomAttributesSpec;
