import { Grid, TextField } from "@mui/material";
import { askForItemAmount } from "../utils";
import { useItemForm } from "./ItemFormProvider";

function GeneralInfo() {
  const { itemConfig, item, setItemAttribute, setInitialSetting } =
    useItemForm();

  return (
    <Grid container spacing={1} width="50%">
      <Grid item xs={12} sm={6}>
        <TextField
          label="title"
          name="title"
          value={item.attributes.title}
          onChange={(e) => setItemAttribute({ title: e.target.value })}
          fullWidth
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="subtitle"
          name="subtitle"
          value={item.attributes.subtitle}
          onChange={(e) => setItemAttribute({ subtitle: e.target.value })}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="description"
          name="description"
          value={item.attributes.description}
          onChange={(e) => setItemAttribute({ description: e.target.value })}
          fullWidth
          multiline
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="image"
          name="image"
          value={item.attributes.image}
          onChange={(e) => setItemAttribute({ image: e.target.value })}
          fullWidth
        />
      </Grid>

      {askForItemAmount(itemConfig.core) && (
        <Grid item xs={12} sm={6}>
          <TextField
            label="amount"
            name="amount"
            value={item.initialSettings.amount?.toString()}
            onChange={(e) =>
              setInitialSetting({ amount: parseInt(e.target.value, 10) })
            }
            fullWidth
            type="number"
          />
        </Grid>
      )}
    </Grid>
  );
}

export default GeneralInfo;
