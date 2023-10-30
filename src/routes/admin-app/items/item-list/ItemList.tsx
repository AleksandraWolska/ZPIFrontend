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
import useItems from "./useItems";
import theme from "../../../../theme";
import ConfirmDialog from "./ConfirmDialog";
import useDeleteItem from "./useDeleteItem";
import useUpdateItemActivity from "./useUpdateItemActivity";
import { Item } from "../../../../types";
import useStoreConfig from "../../useStoreConfig";

function ItemList() {
  const items = useItems();
  const storeConfig = useStoreConfig();

  const [itemToHaveActivityUpdated, setItemToHaveActivityUpdated] = useState<
    string | null
  >(null);
  const currentActivity = items.find((i) => i.id === itemToHaveActivityUpdated)
    ?.status.active;
  const updateItemActivity = useUpdateItemActivity();

  const [itemToBeDeleted, setItemToBeDeleted] = useState<string | null>(null);
  const deleteItem = useDeleteItem();

  return (
    <>
      <Stack spacing={4} width="80%">
        {items.map((item) => {
          return (
            <Card key={item.id} sx={{ display: "flex", padding: 1 }} raised>
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
                <ItemImage
                  image={item.attributes.image}
                  title={item.attributes.title}
                />
              </Box>

              <CardContent sx={{ width: "80%", paddingLeft: 4 }}>
                <ItemDescription item={item} />
              </CardContent>

              <Stack width="20%" spacing={2} padding={2}>
                {storeConfig.core.flexibility && (
                  <Link to={`${item.id}/reschedule`}>
                    <ActionBtn text="Reschedule" />
                  </Link>
                )}

                <Link to={`${item.id}/edit`}>
                  <ActionBtn text="Edit" />
                </Link>

                <ActionBtn
                  text={item.status.active ? "Deactivate" : "Activate"}
                  onClick={() => setItemToHaveActivityUpdated(item.id)}
                />

                <ActionBtn
                  text="Delete"
                  onClick={() => setItemToBeDeleted(item.id)}
                />
              </Stack>
            </Card>
          );
        })}
      </Stack>
      <ConfirmDialog
        isOpen={!!itemToHaveActivityUpdated}
        onCancel={() => setItemToHaveActivityUpdated(null)}
        onConfirm={() => {
          updateItemActivity.mutate({
            itemId: itemToHaveActivityUpdated!,
            active: !currentActivity,
          });
          setItemToHaveActivityUpdated(null);
        }}
        title={currentActivity ? "Activate Item" : "Deactivate Item"}
        message={
          currentActivity ? "Activate this item?" : "Deactivate this item?"
        }
      />
      <ConfirmDialog
        isOpen={!!itemToBeDeleted}
        onCancel={() => setItemToBeDeleted(null)}
        onConfirm={() => {
          deleteItem.mutate(itemToBeDeleted!);
          setItemToBeDeleted(null);
        }}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
      />
    </>
  );
}

function ItemImage({ image, title }: { image: string; title: string }) {
  return image ? (
    <img
      src={image}
      alt={title}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
      }}
    />
  ) : (
    <NoPhotographyIcon sx={{ fontSize: "8rem" }} />
  );
}

function ItemDescription({ item }: { item: Item }) {
  return (
    <>
      <Stack direction="row" spacing={1}>
        <Typography variant="h4">{item.attributes.title}</Typography>
        {item.status.active ? (
          <Chip label="active" color="success" />
        ) : (
          <Chip label="inactive" color="error" />
        )}
      </Stack>
      <Typography variant="h5" color={theme.palette.text.secondary}>
        {item.id}
      </Typography>
      <Box marginTop={2}>
        {item.customAttributeList.map((customAttribute) => {
          return (
            <Typography
              key={customAttribute.id}
              variant="h6"
            >{`${customAttribute.name}: ${customAttribute.value}`}</Typography>
          );
        })}
      </Box>
    </>
  );
}

// eslint-disable-next-line react/require-default-props
function ActionBtn({ text, onClick }: { text: string; onClick?: () => void }) {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      fullWidth
      sx={{ fontSize: "1.2rem" }}
    >
      {text}
    </Button>
  );
}

export default ItemList;
