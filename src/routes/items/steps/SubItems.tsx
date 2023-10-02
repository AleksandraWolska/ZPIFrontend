import { v4 as uuid } from "uuid";
import { useState } from "react";
import { IconButton, Stack, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { NewItem } from "../types";
import { SubItem } from "../../userapp/mocks/types";

const defaultSubItem: Omit<SubItem, "id"> = {
  title: "",
  subtitle: "",
  availableAmount: 0,
};

function SubItems({
  newItem,
  setAttribute,
  goNext,
  goPrev,
}: {
  newItem: NewItem;
  setAttribute: (attr: Partial<NewItem>) => void;
  goNext: () => void;
  goPrev: () => void;
}) {
  const initialLocalSubItems = [
    ...(newItem.subitemList || []),
    {
      id: uuid(),
      ...defaultSubItem,
    },
  ];

  const [localSubItems, setLocalSubItems] = useState(initialLocalSubItems);
  const lastIdx = localSubItems.length - 1;

  const updateLocalSubItem = (id: string, subItem: Partial<SubItem>) => {
    setLocalSubItems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...subItem } : s)),
    );
  };

  const saveSubItemList = () => {
    const subitemList = localSubItems.filter((s) => s.title !== "");
    setAttribute({ subitemList });
  };

  return (
    <>
      {localSubItems.map((subItem, idx) => {
        const disabled = subItem.title === "";

        return (
          <Stack key={subItem.id} direction="row" gap={1}>
            <TextField
              label="title"
              value={subItem.title}
              onChange={(e) => {
                updateLocalSubItem(subItem.id, { title: e.target.value });
                if (idx === lastIdx) {
                  setLocalSubItems((prev) => [
                    ...prev,
                    { id: uuid(), ...defaultSubItem },
                  ]);
                }
              }}
              required
            />

            <TextField
              label="subtitle"
              value={subItem.subtitle}
              onChange={(e) => {
                updateLocalSubItem(subItem.id, { subtitle: e.target.value });
              }}
              disabled={disabled}
            />

            <TextField
              label="availableAmount"
              value={subItem.availableAmount}
              onChange={(e) => {
                updateLocalSubItem(subItem.id, {
                  availableAmount: Number(e.target.value),
                });
              }}
              type="number"
              disabled={disabled}
            />

            <IconButton
              onClick={() => {
                setLocalSubItems((prev) =>
                  prev.filter((s) => s.id !== subItem.id),
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
