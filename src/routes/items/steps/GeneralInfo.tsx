import { Grid, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
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
      <Grid container spacing={1} width="50%">
        <Grid item xs={12} sm={6}>
          <TextField
            label="title"
            name="title"
            value={newItem.title}
            onChange={(e) => setAttribute({ title: e.target.value })}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="subtitle"
            name="subtitle"
            value={newItem.subtitle}
            onChange={(e) => setAttribute({ subtitle: e.target.value })}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="description"
            name="description"
            value={newItem.description}
            onChange={(e) => setAttribute({ description: e.target.value })}
            fullWidth
            multiline
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="image"
            name="image"
            value={newItem.image}
            onChange={(e) => setAttribute({ image: e.target.value })}
            fullWidth
          />
        </Grid>

        {"availableAmount" in newItem && (
          <Grid item xs={12} sm={6}>
            <TextField
              label="availableAmount"
              name="availableAmount"
              value={newItem.availableAmount}
              onChange={(e) =>
                setAttribute({ availableAmount: Number(e.target.value) })
              }
              fullWidth
              type="number"
            />
          </Grid>
        )}

        {"date" in newItem && (
          <Grid item xs={12} sm={6}>
            <DateTimePicker
              label="date"
              value={newItem.date ? dayjs(newItem.date) : dayjs()}
              onChange={(date) => {
                if (date) setAttribute({ date: date.toString() });
              }}
            />
          </Grid>
        )}
      </Grid>

      <button type="button" onClick={goNext}>
        Next
      </button>
    </>
  );
}

export default GeneralInfo;
