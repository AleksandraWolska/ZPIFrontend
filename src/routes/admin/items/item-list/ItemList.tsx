import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Collapse,
  Divider,
  FormControlLabel,
  List,
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
import { ExpandMore } from "@mui/icons-material";
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
import { FixedSchedule, Item, Schedule } from "../../../../types";
import useStoreConfig from "../../store/useStoreConfig";
import ItemImage from "../../components/ItemImage";
import {
  ActionBox,
  ClearNavLink,
} from "../../../../shared-components/customComponents";
import { shouldShowEnd } from "../../../../shared-components/utils";

function isFixedSchedule(schedule: Schedule): schedule is FixedSchedule {
  return (schedule as FixedSchedule).startDateTime !== undefined;
}

function ItemList() {
  const storeConfig = useStoreConfig();

  const items = useItems();
  const [futureOnly, setFutureOnly] = useState(false);

  const filteredItems = items
    .filter(
      (item) =>
        !futureOnly ||
        !item.schedule ||
        !isFixedSchedule(item.schedule) ||
        new Date(item.schedule.startDateTime) > new Date(),
    )
    .sort((a, b) => {
      if (
        a.schedule &&
        b.schedule &&
        isFixedSchedule(a.schedule) &&
        isFixedSchedule(b.schedule)
      ) {
        return (
          new Date(a.schedule.startDateTime).getTime() -
          new Date(b.schedule.startDateTime).getTime()
        );
      }

      return a.attributes.title.localeCompare(b.attributes.title);
    });

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleExpand = (reservationId: string) => {
    setExpandedId((prev) => (prev === reservationId ? null : reservationId));
  };

  const [itemToHaveActivityUpdated, setItemToHaveActivityUpdated] = useState<
    string | null
  >(null);
  const currentActivity = filteredItems.find(
    (i) => i.id === itemToHaveActivityUpdated,
  )?.active;
  const updateItemActivity = useUpdateItemActivity();

  const [itemToBeDeleted, setItemToBeDeleted] = useState<string | null>(null);
  const deleteItem = useDeleteItem();

  if (!items.length)
    return (
      <Box display="flex" m={3} alignItems="center" flexDirection="column">
        <Typography variant="h4">Items list</Typography>
        <Typography variant="overline" mb={2}>
          It seems there is no items defined in this store yet...
        </Typography>
        <ClearNavLink to="../add-item">
          <ListItem key="new">
            <ActionBox theme={theme}>
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
            </ActionBox>
          </ListItem>
        </ClearNavLink>
      </Box>
    );
  return (
    <Container>
      <Stack sx={{ marginTop: 2 }} spacing={4}>
        <Typography variant="h3">Items list</Typography>
        {!storeConfig.core.flexibility && !storeConfig.core.periodicity && (
          <FormControlLabel
            sx={{ marginTop: 4 }}
            control={
              <Checkbox
                checked={futureOnly}
                onChange={(e) => {
                  setFutureOnly(e.target.checked);
                }}
              />
            }
            label="Show future events only"
          />
        )}
        {filteredItems.map((item) => {
          return (
            <Card
              sx={{ boxShadow: 3, borderRadius: "10px" }}
              key={item.id}
              raised
            >
              <Box
                sx={{
                  padding: 3,
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  "@media (max-width: 800px)": {
                    flexDirection: "column",
                  },
                }}
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

                  <ActionBtnOutlined
                    text={item.active ? "Deactivate" : "Activate"}
                    onClick={() => setItemToHaveActivityUpdated(item.id)}
                    icon={
                      item.active ? <BlockIcon /> : <PowerSettingsNewIcon />
                    }
                  />

                  <ActionBtnOutlined
                    text="Delete"
                    onClick={() => setItemToBeDeleted(item.id)}
                    icon={<DeleteIcon />}
                  />

                  {item.subItems && item.subItems.length > 0 && (
                    <ActionBtnBasic
                      text="Details"
                      onClick={() => handleExpand(item.id)}
                      icon={<ExpandMore sx={{ fontSize: "1.5rem" }} />}
                    />
                  )}
                </Stack>
              </Box>
              <Collapse
                in={expandedId === item.id}
                timeout="auto"
                unmountOnExit
              >
                <Box style={{ padding: 15 }}>
                  <Divider sx={{ mb: 1 }} />
                  <Typography variant="body2" color="textPrimary" gutterBottom>
                    Subitems:
                  </Typography>
                  {item.subItems && (
                    <List>
                      {item.subItems.map((si) => (
                        <ListItem key={si.id}>
                          <Typography>{si.title}</Typography>
                          {si.schedule && si.schedule.startDateTime && (
                            <>
                              <Typography ml={1} color="grey">
                                {` | `}
                              </Typography>
                              <Typography ml={1} color="grey">
                                {new Date(
                                  si.schedule.startDateTime,
                                ).toLocaleString()}
                              </Typography>
                              {shouldShowEnd(
                                si.schedule.startDateTime,
                                si.schedule.endDateTime,
                              ) && (
                                <>
                                  <Typography ml={1} color="grey">
                                    {` - `}
                                  </Typography>
                                  <Typography ml={1} color="grey">
                                    {new Date(
                                      si.schedule.endDateTime!,
                                    ).toLocaleString()}
                                  </Typography>
                                </>
                              )}
                            </>
                          )}

                          {si.amount !== (null || undefined) && (
                            <>
                              <Typography ml={1} color="grey">
                                {` - `}
                              </Typography>
                              {/* periodic events fr one person, specific seats are taken/available (core 2, 4) */}
                              {/* periodic events for many people should show amount (core 5) */}
                              {storeConfig.core.specificReservation ||
                              storeConfig.core.periodicity !==
                                storeConfig.core.simultaneous ? (
                                <Typography ml={1} color="grey">
                                  {si.amount === 0 ? "taken" : "available"}
                                </Typography>
                              ) : (
                                <Typography ml={1} color="grey">
                                  Amount: {si.amount}
                                </Typography>
                              )}
                            </>
                          )}
                          {si.availableAmount !== (null || undefined) && (
                            <>
                              <Typography ml={1} color="grey">
                                {` - `}
                              </Typography>
                              {/* periodic events fr one person, specific seats are taken/available (core 2, 4) */}
                              {/* periodic events for many people should show amount (core 5) */}
                              {storeConfig.core.specificReservation ||
                              storeConfig.core.periodicity !==
                                storeConfig.core.simultaneous ? (
                                <Typography ml={1} color="grey">
                                  {si.availableAmount === 0
                                    ? "taken"
                                    : "available"}
                                </Typography>
                              ) : (
                                <Typography ml={1} color="grey">
                                  Remaining Amount: {si.availableAmount}
                                </Typography>
                              )}
                            </>
                          )}
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Box>
              </Collapse>
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
  const storeConfig = useStoreConfig();
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
      {!storeConfig.core.flexibility &&
        item.schedule &&
        (item.schedule as FixedSchedule).startDateTime && (
          <Typography color="textSecondary">
            {`${new Date(
              (item.schedule as FixedSchedule).startDateTime,
            ).toLocaleString()}${
              shouldShowEnd(
                (item.schedule as FixedSchedule).startDateTime,
                (item.schedule as FixedSchedule).endDateTime,
              )
                ? ` - ${new Date(
                    (item.schedule as FixedSchedule).endDateTime!,
                  ).toLocaleString()}`
                : ""
            }`}
          </Typography>
        )}
      <Box sx={{ display: "flex" }}>
        <Typography sx={{}} variant="h6" color={theme.palette.text.secondary}>
          Id: {item.id}
        </Typography>

        {item.amount !== (null || undefined) && (
          <>
            <Divider orientation="vertical" sx={{ m: 2 }} flexItem />

            <Typography variant="h6" color={theme.palette.text.secondary}>
              Initial Amount: {item.amount}
            </Typography>
          </>
        )}
        {item.availableAmount !== (null || undefined) && (
          <>
            <Divider orientation="vertical" sx={{ m: 2 }} flexItem />
            {storeConfig.core.simultaneous ? (
              <Typography variant="h6" color={theme.palette.text.secondary}>
                Remaining Amount: {item.availableAmount}
              </Typography>
            ) : (
              <Typography variant="h6" color={theme.palette.text.secondary}>
                {item.availableAmount === 0 ? "taken" : "available"}
              </Typography>
            )}
          </>
        )}
      </Box>
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

function ActionBtnOutlined({
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

function ActionBtnBasic({
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
      fullWidth
      sx={{
        display: "flex",
        margin: 1,
        flexDirection: "row",
      }}
    >
      {text}
      {icon}
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
