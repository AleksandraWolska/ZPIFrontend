import { Grid, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { NewItemSchema, NewItemOptions, NewItem } from "../types";
import { Core } from "../../../types";
import { askForAmount, askForDate } from "../utils";

function GeneralInfo({
  newItemSchema,
  core,
  setItemAttribute,
  setItemOption,
  goNext,
}: {
  newItemSchema: NewItemSchema;
  core: Core;
  setItemAttribute: (attr: Partial<NewItem>) => void;
  setItemOption: (option: Partial<NewItemOptions>) => void;
  goNext: () => void;
}) {
  return (
    <>
      <Grid container spacing={1} width="50%">
        <Grid item xs={12} sm={6}>
          <TextField
            label="title"
            name="title"
            value={newItemSchema.item.title}
            onChange={(e) => setItemAttribute({ title: e.target.value })}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="subtitle"
            name="subtitle"
            value={newItemSchema.item.subtitle}
            onChange={(e) => setItemAttribute({ subtitle: e.target.value })}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="description"
            name="description"
            value={newItemSchema.item.description}
            onChange={(e) => setItemAttribute({ description: e.target.value })}
            fullWidth
            multiline
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="image"
            name="image"
            value={newItemSchema.item.image}
            onChange={(e) => setItemAttribute({ image: e.target.value })}
            fullWidth
          />
        </Grid>

        {askForAmount(core) && (
          <Grid item xs={12} sm={6}>
            <TextField
              label="amount"
              name="amount"
              value={newItemSchema.options.amount}
              onChange={(e) =>
                setItemOption({ amount: Number(e.target.value) })
              }
              fullWidth
              type="number"
            />
          </Grid>
        )}

        {askForDate(core) && (
          <Grid item xs={12} sm={6}>
            <DateTimePicker
              label="schedule"
              slotProps={{ textField: { fullWidth: true } }}
              value={
                newItemSchema.options.schedule
                  ? dayjs(newItemSchema.options.schedule as string)
                  : dayjs()
              }
              onChange={(date) => {
                if (date) setItemOption({ schedule: date.toString() });
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
