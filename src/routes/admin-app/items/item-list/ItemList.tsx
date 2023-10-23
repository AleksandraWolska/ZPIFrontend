import {
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import { Box } from "@mui/system";
import { useState } from "react";
import useEnhancedItems from "./useEnhancedItems";
import theme from "../../../../theme";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import useDeleteItem from "./useDeleteItem";

function ItemList() {
  const enhancedItems = useEnhancedItems();

  const [itemToBeDeleted, setItemToBeDeleted] = useState<string | null>(null);
  const deleteItem = useDeleteItem();

  return (
    <>
      <Stack spacing={4} width="80%">
        {enhancedItems.map((enhancedItem) => {
          return (
            <Card
              key={enhancedItem.item.id}
              sx={{ display: "flex", padding: 1 }}
              raised
            >
              <Box
                sx={{
                  width: "300px",
                  height: "300px",
                  padding: 0.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
                style={{ border: "2px solid black" }}
              >
                {enhancedItem.item.image ? (
                  <img
                    src={enhancedItem.item.image}
                    alt={enhancedItem.item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <NoPhotographyIcon sx={{ fontSize: "8rem" }} />
                )}
              </Box>
              <CardContent sx={{ width: "80%", paddingLeft: 4 }}>
                <Box>
                  <Stack direction="row" spacing={1}>
                    <Typography variant="h4">
                      {enhancedItem.item.title}
                    </Typography>
                    {enhancedItem.item.active ? (
                      <Chip label="active" color="success" />
                    ) : (
                      <Chip label="inactive" color="error" />
                    )}
                  </Stack>
                  <Typography variant="h5" color={theme.palette.text.secondary}>
                    {enhancedItem.item.id}
                  </Typography>
                  <Box marginTop={2}>
                    {enhancedItem.item.customAttributeList.map(
                      (customAttribute) => {
                        return (
                          <Typography
                            key={customAttribute.id}
                            variant="h6"
                          >{`${customAttribute.name}: ${customAttribute.value}`}</Typography>
                        );
                      },
                    )}
                  </Box>
                </Box>
              </CardContent>
              <Stack width="20%" spacing={2} padding={2}>
                <Link to={`edit/${enhancedItem.item.id}`}>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ fontSize: "1.2rem" }}
                  >
                    Reschedule
                  </Button>
                </Link>
                <Link to={`edit/${enhancedItem.item.id}`}>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ fontSize: "1.2rem" }}
                  >
                    Edit
                  </Button>
                </Link>
                <Link to={`edit/${enhancedItem.item.id}`}>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ fontSize: "1.2rem" }}
                  >
                    Desactivate
                  </Button>
                </Link>
                <Button
                  onClick={() => setItemToBeDeleted(enhancedItem.item.id)}
                  variant="outlined"
                  fullWidth
                  sx={{ fontSize: "1.2rem" }}
                >
                  Delete
                </Button>
              </Stack>
            </Card>
          );
        })}
      </Stack>
      <DeleteConfirmDialog
        isOpen={!!itemToBeDeleted}
        onCancel={() => setItemToBeDeleted(null)}
        onConfirm={() => {
          deleteItem.mutate(itemToBeDeleted!);
          setItemToBeDeleted(null);
        }}
      />
    </>
  );
}

export default ItemList;
