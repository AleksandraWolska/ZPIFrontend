import { Grid, TextField } from "@mui/material";
import { NewItem, NewItemSchema } from "../new-item/types";
import { EditedItem, EditedItemSchema } from "../edit-item/types";
import { askForAmount } from "../new-item/NewItemSchemaProvider";
import { Core } from "../../../types";

function GeneralInfoForm({
  itemSchema,
  setItemAttribute,
  setOption,
  core,
}: {
  itemSchema: NewItemSchema | EditedItemSchema;
  setItemAttribute: (
    attr: Partial<Omit<NewItem | EditedItem, "customAttributeList">>,
  ) => void;
  setOption: (
    option: Partial<(NewItemSchema | EditedItemSchema)["options"]>,
  ) => void;
  core: Core;
}) {
  return (
    <Grid container spacing={1} width="50%">
      <Grid item xs={12} sm={6}>
        <TextField
          label="title"
          name="title"
          value={itemSchema.item.title}
          onChange={(e) => setItemAttribute({ title: e.target.value })}
          fullWidth
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="subtitle"
          name="subtitle"
          value={itemSchema.item.subtitle}
          onChange={(e) => setItemAttribute({ subtitle: e.target.value })}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="description"
          name="description"
          value={itemSchema.item.description}
          onChange={(e) => setItemAttribute({ description: e.target.value })}
          fullWidth
          multiline
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="image"
          name="image"
          value={itemSchema.item.image}
          onChange={(e) => setItemAttribute({ image: e.target.value })}
          fullWidth
        />
      </Grid>

      {askForAmount(core) && (
        <Grid item xs={12} sm={6}>
          <TextField
            label="amount"
            name="amount"
            value={itemSchema.options.amount?.toString()}
            onChange={(e) =>
              setOption({ amount: parseInt(e.target.value, 10) })
            }
            fullWidth
            type="number"
          />
        </Grid>
      )}
    </Grid>
  );
}

export default GeneralInfoForm;
