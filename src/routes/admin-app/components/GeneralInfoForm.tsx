import { Grid, TextField } from "@mui/material";
import { askForAmount } from "../new-item/NewItemProvider";
import { Core } from "../../../types";
import { EnhancedItem } from "../types";

function GeneralInfoForm({
  enhancedItem,
  setItemAttribute,
  setInitialStatus,
  core,
}: {
  enhancedItem: EnhancedItem;
  setItemAttribute: (
    attr: Partial<Omit<EnhancedItem["item"], "customAttributeList">>,
  ) => void;
  setInitialStatus: (option: Partial<EnhancedItem["initialStatus"]>) => void;
  core: Core;
}) {
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

      {askForAmount(core) && (
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

export default GeneralInfoForm;
