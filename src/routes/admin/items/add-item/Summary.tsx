import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, Box, Button, Typography } from "@mui/material";
import useAddItem, { removeIdsFromItem } from "./useAddItem";
import { useItemForm } from "../item-form/ItemFormProvider";
import StepWrapper from "../../components/StepWrapper";
import useStoreConfig from "../../store/useStoreConfig";
import { validateItem } from "../utils";

function Summary() {
  const { item } = useItemForm();
  const storeConfig = useStoreConfig();
  const addItem = useAddItem();
  const navigate = useNavigate();

  const isValid = validateItem(item, storeConfig);

  return (
    <StepWrapper>
      <Typography variant="h4" sx={{ mt: 1, mb: 2 }}>
        Summary
      </Typography>

      {!isValid && (
        <Alert severity="error" sx={{ width: "95%", margin: 3 }}>
          <AlertTitle>Some required data is missing</AlertTitle>
          Fill all the necessary fields to proceed
        </Alert>
      )}

      <Box sx={{ p: 1, pb: 0 }}>
        <div>{JSON.stringify(item)}</div>
        <Button
          sx={{ p: 2, mt: 2 }}
          fullWidth
          disabled={!isValid}
          variant="contained"
          onClick={() => {
            addItem.mutate(removeIdsFromItem(item), {
              onSuccess: () => {
                navigate("../item-list", { relative: "path" });
              },
            });
          }}
        >
          ADD ITEM
        </Button>
      </Box>
    </StepWrapper>
  );
}

export default Summary;
