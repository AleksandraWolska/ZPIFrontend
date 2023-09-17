import { useState } from "react";
import { v4 as uuid } from "uuid";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Attribute, SCHEMA_STEPS, SchemaStep } from "../types";
import { useSchema } from "../SchemaProvider";

type AttributeWithId = Attribute & { id: string };

const defaultParam: Attribute = {
  name: "",
  dataType: "string",
  isRequired: false,
  isFilterable: false,
  showMainPage: false,
  showDetailsPage: false,
};

function Attributes({
  setActiveStep,
}: {
  setActiveStep: (step: SchemaStep) => void;
}) {
  const { schema, setAttributes } = useSchema();

  const initialParams = schema.attributes?.length
    ? [
        ...schema.attributes.map((p) => ({ id: uuid(), ...p })),
        { id: uuid(), ...defaultParam },
      ]
    : [{ id: uuid(), ...defaultParam }];

  const [params, setParams] = useState<AttributeWithId[]>(initialParams);
  const lastIdx = params.length - 1;

  const updateParam = (id: string, attribute: Partial<Attribute>) => {
    setParams((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...attribute } : p)),
    );
  };

  const saveParams = () => {
    const filteredParams = params
      .filter((p) => p.name !== "")
      .map((p) => {
        const { id, ...rest } = p;
        return rest;
      });
    setAttributes(filteredParams);
  };

  return (
    <>
      {params.map((param, idx) => {
        return (
          <Stack key={param.id} direction="row" alignItems="center">
            <TextField
              value={param.name}
              onChange={(e) => {
                updateParam(param.id, { name: e.target.value });
                if (idx === lastIdx) {
                  setParams((prev) => [
                    ...prev,
                    { id: uuid(), ...defaultParam },
                  ]);
                }
              }}
            />

            <Select
              value={param.dataType}
              onChange={(e) => {
                const val = e.target.value as Attribute["dataType"];
                updateParam(param.id, { dataType: val });
              }}
            >
              <MenuItem value="string">string</MenuItem>
              <MenuItem value="number">number</MenuItem>
              <MenuItem value="boolean">boolean</MenuItem>
            </Select>

            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={param.isRequired}
                    onChange={(e) => {
                      updateParam(param.id, { isRequired: e.target.checked });
                    }}
                  />
                }
                label="isRequired"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={param.isFilterable}
                    onChange={(e) => {
                      updateParam(param.id, {
                        isFilterable: e.target.checked,
                      });
                    }}
                  />
                }
                label="isFilterable"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={param.showMainPage}
                    onChange={(e) => {
                      updateParam(param.id, {
                        showMainPage: e.target.checked,
                      });
                    }}
                  />
                }
                label="showMainPage"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={param.showDetailsPage}
                    onChange={(e) => {
                      updateParam(param.id, {
                        showDetailsPage: e.target.checked,
                      });
                    }}
                  />
                }
                label="showDetailsPage"
              />
            </FormGroup>

            <IconButton
              onClick={() => {
                setParams((prev) => prev.filter((p) => p.id !== param.id));
              }}
              disabled={idx === lastIdx}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        );
      })}

      <Button
        onClick={() => {
          saveParams();
          setActiveStep(SCHEMA_STEPS.CORE_SUMMARY);
        }}
      >
        Back
      </Button>

      <Button
        onClick={() => {
          saveParams();
          setActiveStep(SCHEMA_STEPS.RATING_AND_COMMENTS);
        }}
      >
        Next
      </Button>
    </>
  );
}

export default Attributes;
