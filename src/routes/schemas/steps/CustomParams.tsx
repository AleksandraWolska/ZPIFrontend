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
import { CustomParam, SCHEMA_STEPS, SchemaStep } from "../types";
import { useSchema } from "../SchemaProvider";

type CustomParamWithId = CustomParam & { id: string };

const defaultParam: CustomParam = {
  name: "",
  dataType: "string",
  isRequired: true,
  isFilterable: false,
};

function CustomParams({
  setActiveStep,
}: {
  setActiveStep: (step: SchemaStep) => void;
}) {
  const { schema, setCustomParams } = useSchema();

  const initialParams = schema.customParams?.length
    ? [
        ...schema.customParams.map((p) => ({ id: uuid(), ...p })),
        { id: uuid(), ...defaultParam },
      ]
    : [{ id: uuid(), ...defaultParam }];

  const [params, setParams] = useState<CustomParamWithId[]>(initialParams);
  const lastIdx = params.length - 1;

  const updateParam = (id: string, attribute: Partial<CustomParam>) => {
    setParams((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...attribute } : p)),
    );
  };

  const saveParams = () => {
    const filteredParams = params.filter((p) => p.name !== "");
    setCustomParams(filteredParams);
  };

  return (
    <>
      {params.map((param, idx) => {
        return (
          <Stack key={param.id} direction="row" alignItems="center">
            <TextField
              size="small"
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
              size="small"
              value={param.dataType}
              onChange={(e) => {
                const val = e.target.value as CustomParam["dataType"];
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
    </>
  );
}

export default CustomParams;
