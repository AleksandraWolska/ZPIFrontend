import { useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/system";
import { Button } from "@mui/material";
import useItemToBeEdited from "./useItemToBeEdited";
import ItemFormProvider, { useItemForm } from "../item-form/ItemFormProvider";
import Schedule from "../item-form/schedule/Schedule";
import useEditItem from "./useEditItem";

function RescheduleItem() {
  const itemToBeEdited = useItemToBeEdited();

  return (
    <ItemFormProvider initialItem={itemToBeEdited}>
      <ScheduleForm />
    </ItemFormProvider>
  );
}

function ScheduleForm() {
  const { item } = useItemForm();
  const editItem = useEditItem();
  const navigate = useNavigate();

  return (
    <Container>
      <Box
        sx={{
          maxWidth: "1000px",
          width: "90vw",
          boxShadow: "1px 1px 5px 2px rgba(0, 0, 0, .2)",
          borderRadius: "15px",
          padding: 1.25,
          margin: "auto",
        }}
      >
        <Schedule />

        <Box sx={{ p: 3, mt: 4 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              editItem.mutate(item, {
                onSuccess: () => {
                  navigate("../..", { relative: "path" });
                },
              });
            }}
          >
            Reschedule
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default RescheduleItem;
