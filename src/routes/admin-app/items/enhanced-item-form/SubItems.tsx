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
import { EnhancedSubItem } from "../../types";
import { useEnhancedItem } from "../enhanced-item-context/EnhancedItemProvider";

type EnhancedSubItemWithoutSubItemId = Omit<EnhancedSubItem, "subItem"> & {
  subItem: Omit<EnhancedSubItem["subItem"], "id">;
};

const defaultEnhancedSubItem: EnhancedSubItemWithoutSubItemId = {
  subItem: {
    title: "",
    subtitle: "",
  },
  initialStatus: {
    amount: 0,
  },
};

function SubItems() {
  const { enhancedItem, setItemAttribute } = useEnhancedItem();

  const initialLocalEnhancedSubItems: EnhancedSubItem[] = [
    ...(enhancedItem.item.subItemList || []),
    {
      subItem: {
        ...defaultEnhancedSubItem.subItem,
        id: uuid(),
      },
      initialStatus: { ...defaultEnhancedSubItem.initialStatus },
    },
  ];

  const [localEnhancedSubItems, setLocalEnhancedSubItems] = useState(
    initialLocalEnhancedSubItems,
  );
  const lastIdx = localEnhancedSubItems.length - 1;

  const updateLocalAttribute = (
    id: string,
    attr: Partial<EnhancedSubItem["subItem"]>,
  ) => {
    const newValue = localEnhancedSubItems.map((enhancedSubItem) =>
      enhancedSubItem.subItem.id === id
        ? {
            ...enhancedSubItem,
            subItem: { ...enhancedSubItem.subItem, ...attr },
          }
        : enhancedSubItem,
    );

    setLocalEnhancedSubItems(newValue);
    saveSubItemList(newValue);
  };

  const updateLocalInitialStatus = (
    id: string,
    initialStatus: Partial<EnhancedSubItem["initialStatus"]>,
  ) => {
    const newValue = localEnhancedSubItems.map((enhancedSubItem) =>
      enhancedSubItem.subItem.id === id
        ? {
            ...enhancedSubItem,
            initialStatus: {
              ...enhancedSubItem.initialStatus,
              ...initialStatus,
            },
          }
        : enhancedSubItem,
    );

    setLocalEnhancedSubItems(newValue);
    saveSubItemList(newValue);
  };

  const saveSubItemList = (local: EnhancedSubItem[]) => {
    const subItemList = local.filter((s) => s.subItem.title !== "");

    console.log("subItems", subItemList);
    setItemAttribute({ subItemList });
  };

  return (
    <>
      {localEnhancedSubItems.map((enhancedSubItem, idx) => {
        const disabled = enhancedSubItem.subItem.title === "";

        return (
          <Stack key={enhancedSubItem.subItem.id} direction="row" gap={1}>
            <TextField
              label="title"
              value={enhancedSubItem.subItem.title}
              onChange={(e) => {
                updateLocalAttribute(enhancedSubItem.subItem.id, {
                  title: e.target.value,
                });
                if (idx === lastIdx) {
                  setLocalEnhancedSubItems((prev) => [
                    ...prev,
                    {
                      subItem: {
                        ...defaultEnhancedSubItem.subItem,
                        id: uuid(),
                      },
                      initialStatus: {
                        ...defaultEnhancedSubItem.initialStatus,
                      },
                    },
                  ]);
                }
              }}
              required
            />

            <TextField
              label="subtitle"
              value={enhancedSubItem.subItem.subtitle}
              onChange={(e) => {
                updateLocalAttribute(enhancedSubItem.subItem.id, {
                  subtitle: e.target.value,
                });
              }}
              disabled={disabled}
            />

            <TextField
              label="amount"
              value={enhancedSubItem.initialStatus.amount?.toString()}
              onChange={(e) => {
                updateLocalInitialStatus(enhancedSubItem.subItem.id, {
                  amount: parseInt(e.target.value, 10),
                });
              }}
              type="number"
              disabled={disabled}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={!!enhancedSubItem.initialStatus.schedule}
                  onChange={(e) => {
                    updateLocalInitialStatus(enhancedSubItem.subItem.id, {
                      schedule: e.target.checked
                        ? {
                            startDateTime: dayjs().toISOString(),
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

            {!!enhancedSubItem.initialStatus.schedule && (
              <>
                <DateTimePicker
                  label="startDateTime"
                  value={dayjs(
                    enhancedSubItem.initialStatus.schedule.startDateTime,
                  )}
                  onChange={(date) => {
                    if (date)
                      updateLocalInitialStatus(enhancedSubItem.subItem.id, {
                        schedule: {
                          startDateTime: date.toISOString(),
                          endDateTime:
                            enhancedSubItem.initialStatus.schedule
                              ?.endDateTime || dayjs().toISOString(),
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
                      checked={
                        !!enhancedSubItem.initialStatus.schedule.endDateTime
                      }
                      onChange={(e) => {
                        updateLocalInitialStatus(enhancedSubItem.subItem.id, {
                          schedule: {
                            startDateTime:
                              enhancedSubItem.initialStatus.schedule
                                ?.startDateTime || dayjs().toISOString(),
                            endDateTime: e.target.checked
                              ? dayjs().toISOString()
                              : undefined,
                          },
                        });
                      }}
                    />
                  }
                  label="endDateTime"
                />

                {!!enhancedSubItem.initialStatus.schedule.endDateTime && (
                  <DateTimePicker
                    label="endDateTime"
                    value={dayjs(
                      enhancedSubItem.initialStatus.schedule.endDateTime,
                    )}
                    onChange={(date) => {
                      if (date)
                        updateLocalInitialStatus(enhancedSubItem.subItem.id, {
                          schedule: {
                            startDateTime:
                              enhancedSubItem.initialStatus.schedule
                                ?.startDateTime || dayjs().toISOString(),
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
                setLocalEnhancedSubItems((prev) =>
                  prev.filter(
                    (s) => s.subItem.id !== enhancedSubItem.subItem.id,
                  ),
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
