import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import useAddItem, { removeIdsFromItem } from "./useAddItem";
import { useItemForm } from "../item-form/ItemFormProvider";
import StepWrapper from "../../components/StepWrapper";

function Summary() {
  const { item } = useItemForm();
  const addItem = useAddItem();
  const navigate = useNavigate();

  return (
    <StepWrapper>
      <Typography variant="h4" sx={{ mt: 1, mb: 2 }}>
        Summary
      </Typography>
      <Box sx={{ p: 1, pb: 0 }}>
        <div>{JSON.stringify(item)}</div>
        <Button
          sx={{ p: 2, mt: 2 }}
          fullWidth
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
