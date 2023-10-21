import { Grid, TextField } from "@mui/material";
import { askForAmount } from "../utils";
import { useEnhancedItem } from "../enhanced-item-context/EnhancedItemProvider";

function GeneralInfo() {
  const { itemConfig, enhancedItem, setItemAttribute, setInitialStatus } =
    useEnhancedItem();

  return (
    <Grid container spacing={1} width="50%">
      <Grid item xs={12} sm={6}>
        <TextField
          label="title"
          name="title"
          value={enhancedItem.item.title}
          onChange={(e) => setItemAttribute({ title: e.target.value })}
          fullWidth
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="subtitle"
          name="subtitle"
          value={enhancedItem.item.subtitle}
          onChange={(e) => setItemAttribute({ subtitle: e.target.value })}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="description"
          name="description"
          value={enhancedItem.item.description}
          onChange={(e) => setItemAttribute({ description: e.target.value })}
          fullWidth
          multiline
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="image"
          name="image"
          value={enhancedItem.item.image}
          onChange={(e) => setItemAttribute({ image: e.target.value })}
          fullWidth
        />
      </Grid>

      {askForAmount(itemConfig.core) && (
        <Grid item xs={12} sm={6}>
          <TextField
            label="amount"
            name="amount"
            value={enhancedItem.initialStatus.amount?.toString()}
            onChange={(e) =>
              setInitialStatus({ amount: parseInt(e.target.value, 10) })
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
