import {
  Button,
  Card,
  CardContent,
  Chip,
  ListItem,
  ListItemText,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Container } from "@mui/system";
import BlockIcon from "@mui/icons-material/Block";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import useItems from "./useItems";
import theme from "../../../../theme";
import ConfirmDialog from "../../components/ConfirmDialog";
import useDeleteItem from "./useDeleteItem";
import useUpdateItemActivity from "./useUpdateItemActivity";
import { Item } from "../../../../types";
import useStoreConfig from "../../store/useStoreConfig";
import ItemImage from "../../components/ItemImage";
import AdminActionBox from "../../components/AdminActionBox";

function ItemList() {
  const items = useItems();
  const storeConfig = useStoreConfig();
  const navigate = useNavigate();

  const [itemToHaveActivityUpdated, setItemToHaveActivityUpdated] = useState<
    string | null
  >(null);
  const currentActivity = items.find((i) => i.id === itemToHaveActivityUpdated)
    ?.active;
  const updateItemActivity = useUpdateItemActivity();

  const [itemToBeDeleted, setItemToBeDeleted] = useState<string | null>(null);
  const deleteItem = useDeleteItem();

  if (!items.length)
    return (
      <Box display="flex" m={3} alignItems="center" flexDirection="column">
        <Typography variant="h4" mb={2}>
          It seems there is no items defined in this store yet...
        </Typography>

        <ListItem key="new" onClick={() => navigate("../add-item")}>
          <AdminActionBox theme={theme}>
            <Box sx={{ margin: 1, marginRight: 3 }}>
              <AddIcon sx={{ fontSize: "5rem", color: "grey" }} />
            </Box>
            <ListItemText
              primary={<Typography variant="h4">Add item</Typography>}
              secondary={
                <Typography variant="body1" color="grey">
                  Add new item users can reserve
                </Typography>
              }
            />
          </AdminActionBox>
        </ListItem>
      </Box>
    );
  return (
    <Container>
      <Stack spacing={4}>
        {items.map((item) => {
          return (
            <Card
              key={item.id}
              sx={{
                padding: 3,
                bgcolor: "white",
                boxShadow: 3,
                borderRadius: "10px",
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                opacity: item.availableAmount !== 0 ? 1 : 0.4,
                "@media (max-width: 800px)": {
                  flexDirection: "column",
                },
              }}
              raised
            >
              <Box
                sx={{
                  borderRadius: "10%",
                  marginRight: 2,
                  width: "30%",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "@media (max-width: 800px)": {
                    width: "100%",
                    marginRight: 0,
                    marginBottom: 2,
                  },
                }}
              >
                <ItemImage
                  image={item.attributes.image}
                  title={item.attributes.title}
                />
              </Box>

              <CardContent
                sx={{
                  width: "80%",
                  paddingLeft: 4,
                  "@media (max-width: 800px)": {
                    width: "100%",
                    padding: 0,
                  },
                }}
              >
                <ItemDescription item={item} />
              </CardContent>
              <Stack
                sx={{
                  flexDirection: "column",
                  width: "20%",
                  justifyContent: "space-between",
                  "@media (max-width: 800px)": {
                    flexDirection: "row",
                    width: "100%",
                  },
                }}
              >
                {storeConfig.core.flexibility && (
                  <LinkBtn
                    text="Reschedule"
                    to={`${item.id}/reschedule`}
                    icon={<EditCalendarIcon />}
                  />
                )}

                <LinkBtn
                  text="Edit"
                  to={`${item.id}/edit`}
                  icon={<EditIcon />}
                />

                <ActionBtn
                  text={item.active ? "Deactivate" : "Activate"}
                  onClick={() => setItemToHaveActivityUpdated(item.id)}
                  icon={item.active ? <BlockIcon /> : <PowerSettingsNewIcon />}
                />

                <ActionBtn
                  text="Delete"
                  onClick={() => setItemToBeDeleted(item.id)}
                  icon={<DeleteIcon />}
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
        title={!currentActivity ? "Activate Item" : "Deactivate Item"}
        message={
          !currentActivity ? "Activate this item?" : "Deactivate this item?"
        }
        confirmText={!currentActivity ? "Activate" : "Deactivate"}
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
        confirmText="Delete"
        dialogColor="error"
      />
    </Container>
  );
}

function ItemDescription({ item }: { item: Item }) {
  return (
    <>
      <Stack direction="row" spacing={1}>
        <Typography variant="h4">{item.attributes.title}</Typography>
        {item.active ? (
          <Chip label="active" color="success" />
        ) : (
          <Chip label="inactive" color="error" />
        )}
      </Stack>
      <Typography variant="h5" color={theme.palette.text.secondary}>
        {item.id}
      </Typography>
      <Box marginTop={2}>
        <Table size="small">
          <TableBody>
            {item.customAttributeList.map((customAttribute) => (
              <TableRow
                sx={{
                  "&:nth-of-type(even)": {
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                  },
                }}
                key={customAttribute.id}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    borderBottom: "none",
                    p: "5px",
                    width: "50%",
                  }}
                >
                  <Typography fontSize="1em">{customAttribute.name}</Typography>
                </TableCell>
                {typeof customAttribute.value === "boolean" ? (
                  <TableCell
                    sx={{ borderBottom: "none", p: "2px", width: "50%" }}
                  >
                    <Typography fontSize="1em" fontWeight="bold">
                      {customAttribute.value ? <CheckIcon /> : <ClearIcon />}
                    </Typography>
                  </TableCell>
                ) : (
                  <TableCell
                    sx={{ borderBottom: "none", p: "5px", width: "50%" }}
                  >
                    <Typography fontSize="1em" fontWeight="bold">
                      {customAttribute.value}
                    </Typography>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}

function ActionBtn({
  text,
  onClick,
  icon,
}: {
  text: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      fullWidth
      sx={{
        display: "flex",
        margin: 1,
        flexDirection: "column",
      }}
    >
      {icon}
      {text}
    </Button>
  );
}

function LinkBtn({
  text,
  to,
  icon,
}: {
  text: string;
  to: string;
  icon?: React.ReactNode;
}) {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      fullWidth
      onClick={() => navigate(to)}
      sx={{
        display: "flex",
        margin: 1,
        flexDirection: "column",
      }}
    >
      {icon}
      {text}
    </Button>
  );
}

export default ItemList;
