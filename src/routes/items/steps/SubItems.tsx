import { v4 as uuid } from "uuid";
import { useState } from "react";
import { IconButton, Stack, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers";
import {
  NewItem,
  NewSubItem,
  NewSubItemOptions,
  NewSubItemSchema,
} from "../types";

const defaultSubItemSchema: NewSubItemSchema = {
  subItem: {
    title: "",
    subtitle: "",
  },
  options: {
    amount: 0,
    schedule: dayjs().toString(),
  },
};

type LocalSubItemSchema = NewSubItemSchema & { id: string };

function SubItems({
  newItemSchema,
  setItemAttribute,
  goNext,
  goPrev,
}: {
  newItemSchema: NewItem;
  setItemAttribute: (attr: Partial<NewItem>) => void;
  goNext: () => void;
  goPrev: () => void;
}) {
  const initialLocalSubItemSchemas: LocalSubItemSchema[] = [
    ...(newItemSchema.subItemList || []).map((s) => ({
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
    attr: Partial<NewSubItem>,
  ) => {
    setLocalSubItemSchemas((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, subItem: { ...s.subItem, ...attr } } : s,
      ),
    );
  };

  const updateLocalSubItemOption = (
    id: string,
    option: Partial<NewSubItemOptions>,
  ) => {
    setLocalSubItemSchemas((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, options: { ...s.options, ...option } } : s,
      ),
    );
  };

  const saveSubItemList = () => {
    const subItemList = localSubItemSchemas
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
              value={subItemSchema.options.amount}
              onChange={(e) => {
                updateLocalSubItemOption(subItemSchema.id, {
                  amount: Number(e.target.value),
                });
              }}
              type="number"
              disabled={disabled}
            />

            <DateTimePicker
              label="date"
              value={
                subItemSchema.options.schedule
                  ? dayjs(subItemSchema.options.schedule as string)
                  : dayjs()
              }
              onChange={(date) => {
                if (date)
                  updateLocalSubItemOption(subItemSchema.id, {
                    schedule: date.toString(),
                  });
              }}
              disabled={disabled}
            />

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

      <button
        type="button"
        onClick={() => {
          saveSubItemList();
          goPrev();
        }}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => {
          saveSubItemList();
          goNext();
        }}
      >
        Next
      </button>
    </>
  );
}

export default SubItems;
