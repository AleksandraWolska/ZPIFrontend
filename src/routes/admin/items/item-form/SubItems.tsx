import { v4 as uuid } from "uuid";
import { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import DeleteIcon from "@mui/icons-material/Delete";
import { useItemForm } from "./ItemFormProvider";
import { askForSubItemAmount, askForSubItemSchedule } from "../utils";
import { SubItem } from "../../../../types";
import useStoreConfig from "../../store/useStoreConfig";

function SubItems() {
  const storeConfig = useStoreConfig();
  const { item, setSubItems } = useItemForm();

  const defaultSubItem = {
    title: "",
    subtitle: "",
    ...(askForSubItemAmount(storeConfig.core) && {
      amount: 2,
    }),
    ...(askForSubItemSchedule(storeConfig.core) && {
      schedule: {
        startDateTime: dayjs().toISOString(),
      },
    }),
  };

  const initialLocalSubItems: SubItem[] = [
    ...(item.subItems || []),
    {
      id: uuid(),
      ...defaultSubItem,
    },
  ];

  const [localSubItems, setLocalSubItems] = useState(initialLocalSubItems);
  const lastIdx = localSubItems.length - 1;

  const updateLocalSubItem = (id: string, attr: Partial<SubItem>) => {
    const newValue = localSubItems.map((si) =>
      si.id === id
        ? {
            ...si,
            ...attr,
          }
        : si,
    );

    setLocalSubItems(newValue);
    saveSubItems(newValue);
  };

  const saveSubItems = (local: SubItem[]) => {
    const subItems = local.filter((s) => s.title !== "");

    console.log("subItems", subItems);
    setSubItems(subItems);
  };

  return (
    <>
      {localSubItems.map((subItem, idx) => {
        const disabled = subItem.title === "";

        return (
          <Stack key={subItem.id} direction="row" gap={1}>
            <TextField
              inputProps={{ maxLength: 255 }}
              label="title"
              value={subItem.title}
              onChange={(e) => {
                updateLocalSubItem(subItem.id, {
                  title: e.target.value,
                });
                if (idx === lastIdx) {
                  setLocalSubItems((prev) => [
                    ...prev,
                    {
                      id: uuid(),
                      ...defaultSubItem,
                    },
                  ]);
                }
              }}
              required
            />

            <TextField
              inputProps={{ maxLength: 255 }}
              label="subtitle"
              value={subItem.subtitle}
              onChange={(e) => {
                updateLocalSubItem(subItem.id, {
                  subtitle: e.target.value,
                });
              }}
              disabled={disabled}
            />

            {askForSubItemAmount(storeConfig.core) && (
              <TextField
                inputProps={{ maxLength: 255 }}
                label="amount"
                value={subItem.amount?.toString()}
                onChange={(e) => {
                  updateLocalSubItem(subItem.id, {
                    amount: parseInt(e.target.value, 10),
                  });
                }}
                type="number"
                disabled={disabled}
              />
            )}

            {askForSubItemSchedule(storeConfig.core) && (
              <>
                <DateTimePicker
                  label="startDateTime"
                  value={dayjs(subItem.schedule?.startDateTime)}
                  onChange={(date) => {
                    if (date)
                      updateLocalSubItem(subItem.id, {
                        schedule: {
                          ...subItem.schedule,
                          startDateTime: date.toISOString(),
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
                      checked={!!subItem.schedule?.endDateTime}
                      onChange={(e) => {
                        updateLocalSubItem(subItem.id, {
                          schedule: {
                            startDateTime:
                              subItem.schedule?.startDateTime ||
                              dayjs().toISOString(),
                            endDateTime: e.target.checked
                              ? dayjs().toISOString()
                              : undefined,
                          },
                        });
                      }}
                    />
                  }
                  label="End Time"
                />

                {!!subItem.schedule?.endDateTime && (
                  <DateTimePicker
                    label="End Time"
                    value={dayjs(subItem.schedule.endDateTime)}
                    onChange={(date) => {
                      if (date)
                        updateLocalSubItem(subItem.id, {
                          schedule: {
                            startDateTime:
                              subItem.schedule?.startDateTime ||
                              dayjs().toISOString(),
                            endDateTime: date.toISOString(),
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
                setLocalSubItems((prev) =>
                  prev.filter((si) => si.id !== subItem.id),
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
