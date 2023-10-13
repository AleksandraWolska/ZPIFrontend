import { Grid, TextField } from "@mui/material";
import { askForAmount, useNewItemSchemaConfig } from "../NewItemSchemaProvider";

function GeneralInfo() {
  const { newItemConfig, newItemSchema, setItemAttribute, setOption } =
    useNewItemSchemaConfig();

  return (
    <Grid container spacing={1} width="50%">
      <Grid item xs={12} sm={6}>
        <TextField
          label="title"
          name="title"
          value={newItemSchema.item.title}
          onChange={(e) => setItemAttribute("title", e.target.value)}
          fullWidth
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="subtitle"
          name="subtitle"
          value={newItemSchema.item.subtitle}
          onChange={(e) => setItemAttribute("subtitle", e.target.value)}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="description"
          name="description"
          value={newItemSchema.item.description}
          onChange={(e) => setItemAttribute("description", e.target.value)}
          fullWidth
          multiline
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="image"
          name="image"
          value={newItemSchema.item.image}
          onChange={(e) => setItemAttribute("image", e.target.value)}
          fullWidth
        />
      </Grid>

      {askForAmount(newItemConfig.core) && (
        <Grid item xs={12} sm={6}>
          <TextField
            label="amount"
            name="amount"
            value={newItemSchema.options.amount?.toString()}
            onChange={(e) => setOption("amount", parseInt(e.target.value, 10))}
            fullWidth
            type="number"
          />
        </Grid>
      )}
    </Grid>
  );
}

export default GeneralInfo;
