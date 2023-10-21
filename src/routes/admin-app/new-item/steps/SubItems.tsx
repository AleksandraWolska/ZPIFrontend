import { v4 as uuid } from "uuid";
import { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import { NewSubItemSchema } from "../types";
import { useNewItemSchemaConfig } from "../NewItemSchemaProvider";

const defaultSubItemSchema: NewSubItemSchema = {
  subItem: {
    title: "",
    subtitle: "",
  },
  options: {
    amount: 0,
  },
};

type LocalSubItemSchema = NewSubItemSchema & { id: string };

function SubItems() {
  const { newItemSchema, setItemAttribute } = useNewItemSchemaConfig();

  const initialLocalSubItemSchemas: LocalSubItemSchema[] = [
    ...(newItemSchema.item.subItemList || []).map((s) => ({
      id: uuid(),
      ...s,
    })),
    {
      id: uuid(),
      ...defaultSubItemSchema,
    },
  ];

  const [localSubItemSchemas, setLocalSubItemSchemas] = useState(
    initialLocalSubItemSchemas,
  );
  const lastIdx = localSubItemSchemas.length - 1;

  const updateLocalSubItemAttribute = (
    id: string,
    attr: Partial<NewSubItemSchema["subItem"]>,
  ) => {
    const newValue = localSubItemSchemas.map((s) =>
      s.id === id ? { ...s, subItem: { ...s.subItem, ...attr } } : s,
    );

    setLocalSubItemSchemas(newValue);
    saveSubItemList(newValue);
  };

  const updateLocalSubItemOption = (
    id: string,
    option: Partial<NewSubItemSchema["options"]>,
  ) => {
    const newValue = localSubItemSchemas.map((s) =>
      s.id === id ? { ...s, options: { ...s.options, ...option } } : s,
    );

    setLocalSubItemSchemas(newValue);
    saveSubItemList(newValue);
  };

  const saveSubItemList = (localSchemas: LocalSubItemSchema[]) => {
    const subItemList = localSchemas
      .filter((s) => s.subItem.title !== "")
      .map((s) => {
        const { id, ...rest } = s;
        return rest;
      });
    console.log("subItems", subItemList);
    setItemAttribute({ subItemList });
  };

  return (
    <>
      {localSubItemSchemas.map((subItemSchema, idx) => {
        const disabled = subItemSchema.subItem.title === "";

        return (
          <Stack key={subItemSchema.id} direction="row" gap={1}>
            <TextField
              label="title"
              value={subItemSchema.subItem.title}
              onChange={(e) => {
                updateLocalSubItemAttribute(subItemSchema.id, {
                  title: e.target.value,
                });
                if (idx === lastIdx) {
                  setLocalSubItemSchemas((prev) => [
                    ...prev,
                    { id: uuid(), ...defaultSubItemSchema },
                  ]);
                }
              }}
              required
            />

            <TextField
              label="subtitle"
              value={subItemSchema.subItem.subtitle}
              onChange={(e) => {
                updateLocalSubItemAttribute(subItemSchema.id, {
                  subtitle: e.target.value,
                });
              }}
              disabled={disabled}
            />

            <TextField
              label="amount"
              value={subItemSchema.options.amount?.toString()}
              onChange={(e) => {
                updateLocalSubItemOption(subItemSchema.id, {
                  amount: parseInt(e.target.value, 10),
                });
              }}
              type="number"
              disabled={disabled}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={!!subItemSchema.options.schedule}
                  onChange={(e) => {
                    updateLocalSubItemOption(subItemSchema.id, {
                      schedule: e.target.checked
                        ? {
                            startDateTime: dayjs().toString(),
                            endDateTime: undefined,
                          }
                        : undefined,
                    });
                  }}
                />
              }
              label="schedule"
              disabled={disabled}
            />

            {!!subItemSchema.options.schedule && (
              <>
                <DateTimePicker
                  label="startDateTime"
                  value={dayjs(subItemSchema.options.schedule.startDateTime)}
                  onChange={(date) => {
                    if (date)
                      updateLocalSubItemOption(subItemSchema.id, {
                        schedule: {
                          startDateTime: date.toString(),
                          endDateTime: (
                            subItemSchema.options.schedule?.endDateTime ||
                            dayjs()
                          ).toString(),
                        },
                      });
                  }}
                  disabled={disabled}
                  format="DD.MM.YYYY HH:mm"
                  ampm={false}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!subItemSchema.options.schedule.endDateTime}
                      onChange={(e) => {
                        updateLocalSubItemOption(subItemSchema.id, {
                          schedule: {
                            startDateTime: (
                              subItemSchema.options.schedule?.startDateTime ||
                              dayjs()
                            ).toString(),
                            endDateTime: e.target.checked
                              ? dayjs().toString()
                              : undefined,
                          },
                        });
                      }}
                    />
                  }
                  label="endDateTime"
                />

                {!!subItemSchema.options.schedule.endDateTime && (
                  <DateTimePicker
                    label="endDateTime"
                    value={dayjs(subItemSchema.options.schedule.endDateTime)}
                    onChange={(date) => {
                      if (date)
                        updateLocalSubItemOption(subItemSchema.id, {
                          schedule: {
                            startDateTime: (
                              subItemSchema.options.schedule?.startDateTime ||
                              dayjs()
                            ).toString(),
                            endDateTime: date.toString(),
                          },
                        });
                    }}
                    disabled={disabled}
                    format="DD.MM.YYYY HH:mm"
                    ampm={false}
                  />
                )}
              </>
            )}

            <IconButton
              onClick={() => {
                setLocalSubItemSchemas((prev) =>
                  prev.filter((s) => s.id !== subItemSchema.id),
                );
              }}
              disabled={idx === lastIdx}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        );
      })}
    </>
  );
}

export default SubItems;
