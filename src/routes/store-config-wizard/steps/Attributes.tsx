import { useState } from "react";
import { v4 as uuid } from "uuid";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Attribute, STORE_CONFIG_STEPS, StoreConfigStep } from "../types";
import { useStoreConfig } from "../StoreConfigProvider";

type AttributeWithId = Attribute & { id: string };

const defaultParam: Attribute = {
  name: "",
  dataType: "string",
  isRequired: false,
  isFilterable: false,
  showMainPage: false,
  showDetailsPage: false,
  limitValues: false,
  possibleValues: [],
};

function getInitialLocalAttributes(originalAttributes: Attribute[]) {
  return originalAttributes.length
    ? [
        ...originalAttributes.map((p) => ({ id: uuid(), ...p })),
        { id: uuid(), ...defaultParam },
      ]
    : [{ id: uuid(), ...defaultParam }];
}

function Attributes({
  setActiveStep,
}: {
  setActiveStep: (step: StoreConfigStep) => void;
}) {
  const { storeConfig, withdrawToCoreStep, setAttributes } = useStoreConfig();

  const initialLocalAttributes = getInitialLocalAttributes(
    storeConfig.attributes,
  );
  const [localAttributes, setLocalAttributes] = useState<AttributeWithId[]>(
    initialLocalAttributes,
  );
  const lastIdx = localAttributes.length - 1;

  const updateLocalAttribute = (id: string, attribute: Partial<Attribute>) => {
    setLocalAttributes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...attribute } : p)),
    );
  };

  const saveAttributes = () => {
    const filteredParams = localAttributes
      .filter((p) => p.name !== "")
      .map((p) => {
        const { id, ...rest } = p;
        if (rest.dataType !== "string") {
          delete rest.limitValues;
          delete rest.possibleValues;
        }
        return rest;
      });
    setAttributes(filteredParams);
  };

  return (
    <Stack alignItems="center">
      {localAttributes.map((attr, idx) => {
        const disabled = attr.name === "";

        return (
          <Box key={attr.id} width="50%">
            <Stack direction="row" gap={1}>
              <TextField
                value={attr.name}
                onChange={(e) => {
                  updateLocalAttribute(attr.id, { name: e.target.value });
                  if (idx === lastIdx) {
                    setLocalAttributes((prev) => [
                      ...prev,
                      { id: uuid(), ...defaultParam },
                    ]);
                  }
                }}
              />

              <Select
                value={attr.dataType}
                onChange={(e) => {
                  const val = e.target.value as Attribute["dataType"];
                  updateLocalAttribute(attr.id, { dataType: val });
                }}
                disabled={disabled}
              >
                <MenuItem value="string">string</MenuItem>
                <MenuItem value="number">number</MenuItem>
                <MenuItem value="boolean">boolean</MenuItem>
              </Select>

              <IconButton
                onClick={() => {
                  setLocalAttributes((prev) =>
                    prev.filter((p) => p.id !== attr.id),
                  );
                }}
                disabled={idx === lastIdx}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>

            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={attr.isRequired}
                    onChange={(e) => {
                      updateLocalAttribute(attr.id, {
                        isRequired: e.target.checked,
                      });
                    }}
                  />
                }
                label="isRequired"
                disabled={disabled}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={attr.isFilterable}
                    onChange={(e) => {
                      updateLocalAttribute(attr.id, {
                        isFilterable: e.target.checked,
                      });
                    }}
                  />
                }
                label="isFilterable"
                disabled={disabled}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={attr.showMainPage}
                    onChange={(e) => {
                      updateLocalAttribute(attr.id, {
                        showMainPage: e.target.checked,
                      });
                    }}
                  />
                }
                label="showMainPage"
                disabled={disabled}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={attr.showDetailsPage || false}
                    onChange={(e) => {
                      updateLocalAttribute(attr.id, {
                        showDetailsPage: e.target.checked,
                      });
                    }}
                  />
                }
                label="showDetailsPage"
                disabled={disabled}
              />
            </FormGroup>

            {attr.dataType === "string" && (
              <Stack direction="row" alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={attr.limitValues}
                      onChange={(e) => {
                        updateLocalAttribute(attr.id, {
                          limitValues: e.target.checked,
                        });
                      }}
                    />
                  }
                  label="limitValues"
                  disabled={disabled}
                />

                <Autocomplete
                  multiple
                  freeSolo
                  fullWidth
                  onChange={(_e, values) => {
                    updateLocalAttribute(attr.id, {
                      possibleValues: values as string[],
                    });
                  }}
                  options={[]}
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

            <Divider sx={{ marginTop: 4, marginBottom: 4 }} />
          </Box>
        );
      })}

      <Box>
        <Button
          onClick={() => {
            saveAttributes();
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
          Back
        </Button>

        <Button
          onClick={() => {
            saveAttributes();
            setActiveStep(STORE_CONFIG_STEPS.RATING_AND_COMMENTS);
          }}
        >
          Next
        </Button>
      </Box>
    </Stack>
  );
}

export default Attributes;
