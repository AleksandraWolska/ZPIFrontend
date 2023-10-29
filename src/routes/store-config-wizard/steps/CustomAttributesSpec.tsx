import { useState } from "react";
import { v4 as uuid } from "uuid";
import {
  Autocomplete,
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ArrowBack } from "@mui/icons-material";
import { STORE_CONFIG_STEPS, StoreConfigStep } from "../types";
import { useStoreConfig } from "../StoreConfigProvider";
import ChangePageButtons from "../../../shared-components/ChangePageButtons";
import { CustomAttributeSpec, StoreConfig } from "../../../types";
import {
  backIcon,
  descriptionForm,
  outerFormBox,
  titleForm,
} from "./commonStyles";

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
  const { storeConfig, withdrawToCoreStep, setCustomAttributesSpec } =
    useStoreConfig();

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
    <Stack sx={outerFormBox} alignItems="center">
      <IconButton
        sx={backIcon}
        onClick={() => {
          saveCustomAttributesSpec();
          const prevStep =
            storeConfig.core.periodicity !== undefined
              ? STORE_CONFIG_STEPS.PERIODICITY
              : storeConfig.core.specificReservation !== undefined
              ? STORE_CONFIG_STEPS.SPECIFIC_RESERVATION
              : STORE_CONFIG_STEPS.UNIQUENESS;
          withdrawToCoreStep(prevStep);
          setActiveStep(prevStep);
        }}
      >
        <ArrowBack />
      </IconButton>
      <Typography variant="h4" sx={titleForm}>
        Add attributes
      </Typography>
      <Typography sx={descriptionForm}>
        Define attributes with which you want to define in your items. Choose if
        they are obligatory, if they should be enabled in filtering, choose the
        visibility on main and item detail pages and if ou want define possible
        values
      </Typography>
      <Box width="100%" padding="20px" paddingTop="0px">
        {localAttributesSpec.map((attr, idx) => {
          const disabled = attr.name === "";

          return (
            <Box key={attr.id}>
              <Divider sx={{ marginTop: 4, marginBottom: 4 }} />
              <Stack direction="row" gap={1} marginBottom="10px">
                <TextField
                  value={attr.name}
                  sx={{ width: "60%" }}
                  label="Attribute Name"
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

                <Select
                  value={attr.dataType}
                  label="Attribute Type"
                  sx={{ width: "35%" }}
                  onChange={(e) => {
                    const val = e.target
                      .value as CustomAttributeSpec["dataType"];
                    updateLocalAttributeSpec(attr.id, { dataType: val });
                  }}
                  disabled={disabled}
                >
                  <MenuItem value="string">string</MenuItem>
                  <MenuItem value="number">number</MenuItem>
                  <MenuItem value="boolean">boolean</MenuItem>
                </Select>

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
                  flexDirection: "row",
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
                  label="Required"
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
                  label="Filterable"
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
                  label="Visible on main page"
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
                  label="Visible on details page"
                  disabled={disabled}
                />
              </FormGroup>

              {attr.dataType === "string" && (
                <Stack
                  direction="row"
                  sx={{ alignItems: "center", marginTop: "10px" }}
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
                    label="Predefine values"
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
                        label="Possible values"
                        placeholder="Add a value typing it and pressing enter"
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
    </Stack>
  );
}

export default CustomAttributesSpec;
