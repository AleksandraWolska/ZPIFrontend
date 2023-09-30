import { TextField } from "@mui/material";
import { NewItem } from "../types";

function GeneralInfo({
  newItem,
  setAttribute,
  goNext,
}: {
  newItem: NewItem;
  setAttribute: (attr: Partial<NewItem>) => void;
  goNext: () => void;
}) {
  return (
    <>
      <TextField
        label="title"
        name="title"
        value={newItem.title}
        onChange={(e) => setAttribute({ title: e.target.value })}
        required
      />
      <TextField
        label="subtitle"
        name="subtitle"
        value={newItem.subtitle}
        onChange={(e) => setAttribute({ subtitle: e.target.value })}
      />
      <TextField
        label="description"
        name="description"
        value={newItem.description}
        onChange={(e) => setAttribute({ description: e.target.value })}
        multiline
      />
      <TextField
        label="image"
        name="image"
        value={newItem.image}
        onChange={(e) => setAttribute({ image: e.target.value })}
      />
      <TextField
        label="availableAmount"
        name="availableAmount"
        value={newItem.availableAmount}
        onChange={(e) =>
          setAttribute({ availableAmount: Number(e.target.value) })
        }
        type="number"
      />

      <button type="button" onClick={goNext}>
        Next
      </button>
    </>
  );
}

export default GeneralInfo;
