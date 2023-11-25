import { useState } from "react";
import {
  List,
  Paper,
  ListItem,
  Typography,
  Box,
  Button,
  Collapse,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import { ExpandMore, Delete } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import useUserReservedItems from "./useUserReservedItems";
import { UserReservation } from "../types";

function UserReservationsPage() {
  const { data: reservations } = useUserReservedItems();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reservationToDelete, setReservationToDelete] =
    useState<UserReservation | null>(null);
  const { storeId } = useParams();

  // const login = (
  //   <Box
  //     display="flex"
  //     justifyContent="center"
  //     alignItems="center"
  //     flexDirection="column"
  //     padding="30px"
  //   >
  //     <Typography variant="h6">
  //       Please log in to view your reservations
  //     </Typography>
  //     <Button
  //       variant="contained"
  //       sx={{}}
  //       onClick={() => {
  //         const currentPath = location.pathname + location.search;
  //         auth.signinRedirect({
  //           redirect_uri: `${window.location.origin}${currentPath}`,
  //         });
  //       }}
  //     >
  //       Login{" "}
  //     </Button>
  //   </Box>
  // );

  // if (!auth.isAuthenticated) return login;

  const handleExpand = (reservationId: string) => {
    setExpandedId((prev) => (prev === reservationId ? null : reservationId));
  };

  const sortedReservations = reservations.sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
  );

  const handleDeleteClick = (reservation: UserReservation) => {
    setReservationToDelete(reservation);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (reservationToDelete) {
      console.log(
        `Deleted reservation with ID: ${reservationToDelete.reservationId}`,
      );
      // Add your delete logic here
    }
    setDeleteDialogOpen(false);
    setReservationToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setReservationToDelete(null);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      padding="30px"
    >
      <Typography variant="h3">Your reservations</Typography>
      {["active", "cancelled", "past"].map((type) => (
        <Box maxWidth="1000px" width="100%">
          <Typography variant="overline">{type} reservations</Typography>
          <List>
            {sortedReservations
              .filter((reservation) => type === reservation.status)
              .map((reservation) => (
                <Paper
                  sx={{}}
                  key={reservation.reservationId}
                  style={{ marginBottom: 15, overflow: "hidden" }}
                >
                  <ListItem>
                    <Box
                      sx={{
                        textDecoration: `${
                          reservation.status === "cancelled" && "line-through"
                        }`,
                      }}
                      display="flex"
                      alignItems="center"
                      flexDirection="row"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Box>
                        <Typography sx={{ marginRight: 1 }} color="textPrimary">
                          {reservation.item.title}
                        </Typography>
                        <Typography color="textSecondary">
                          {`${new Date(
                            reservation.start,
                          ).toLocaleString()} - ${new Date(
                            reservation.end!,
                          ).toLocaleString()}`}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton
                          onClick={() =>
                            handleExpand(reservation.reservationId)
                          }
                          aria-label="expand"
                          style={{
                            transform:
                              expandedId === reservation.reservationId
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            transition: "transform 150ms",
                          }}
                        >
                          <ExpandMore />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteClick(reservation)}
                          disabled={!(reservation.status === "active")}
                          sx={{
                            opacity: `${
                              reservation.status === "active" ? "100%" : "0%"
                            }`,
                          }}
                          aria-label="delete"
                        >
                          <Delete />
                        </IconButton>
                        <Link
                          to={`/userapp/${storeId}/${reservation.item.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button variant="outlined" color="primary">
                            Item page
                          </Button>
                        </Link>
                      </Box>
                    </Box>
                  </ListItem>
                  <Collapse
                    in={expandedId === reservation.reservationId}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box style={{ padding: 15 }}>
                      <Divider sx={{ mb: 1 }} />
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        gutterBottom
                      >
                        Details:
                      </Typography>
                      {reservation.subItems && (
                        <List>
                          {reservation.subItems.map((si) => (
                            <ListItem key={si.id}>
                              <Typography>{si.title}</Typography>
                            </ListItem>
                          ))}
                        </List>
                      )}
                      {reservation.message && (
                        <Typography>Message: {reservation.message}</Typography>
                      )}
                    </Box>
                  </Collapse>
                </Paper>
              ))}
          </List>
        </Box>
      ))}

      {reservationToDelete && (
        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteCancel}
          maxWidth="sm"
          fullWidth
          PaperProps={{ sx: { borderRadius: "10px" } }}
        >
          <DialogTitle sx={{ textAlign: "center", fontWeight: "medium" }}>
            <Typography variant="h4">Delete reservation?</Typography>
          </DialogTitle>
          <DialogContent sx={{ textAlign: "center" }}>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              {reservationToDelete.item.title}
            </Typography>
            <Typography>
              {`Starts on:  ${new Date(
                reservationToDelete.start,
              ).toLocaleString()}`}
            </Typography>
            {reservationToDelete.end && (
              <Typography>
                {`Ends on ${new Date(
                  reservationToDelete.end,
                ).toLocaleString()}`}
              </Typography>
            )}
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            <Typography>
              {`Are you sure you want to delete reservation for ${reservationToDelete?.item.title}? This action is irreversible.`}
            </Typography>
          </DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              padding: "15px",
            }}
          >
            <Button
              color="error"
              variant="outlined"
              sx={{ flex: 1, mr: 0.5 }}
              onClick={handleDeleteCancel}
            >
              CANCEL
            </Button>
            <Button
              color="error"
              variant="contained"
              sx={{ flex: 1, ml: 0.5 }}
              onClick={handleDeleteConfirm}
            >
              DELETE
            </Button>
          </Box>
        </Dialog>
      )}
    </Box>
  );
}

export default UserReservationsPage;
