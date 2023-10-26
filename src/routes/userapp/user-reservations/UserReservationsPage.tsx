import { useState } from "react";
import {
  List,
  Paper,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Button,
  Collapse,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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

  const handleExpand = (reservationId: string) => {
    setExpandedId((prev) => (prev === reservationId ? null : reservationId));
  };

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
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
      <Box maxWidth="1000px" width="100%">
        <List>
          {reservations.map((reservation: UserReservation) => (
            <Paper
              key={reservation.reservationId}
              style={{ marginBottom: 15, overflow: "hidden" }}
            >
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center">
                      <Typography
                        sx={{ marginRight: 1 }}
                        component="span"
                        variant="body1"
                        color="textPrimary"
                      >
                        {reservation.item.title}
                        {reservation.subitem && (
                          <span> - {reservation.subitem.title}</span>
                        )}
                      </Typography>
                      <Typography
                        component="span"
                        variant="caption"
                        color="textSecondary"
                      >
                        {` — ${formatDate(reservation.start)}`}
                      </Typography>
                    </Box>
                  }
                  secondary={formatDate(reservation.end)}
                />
                <Box>
                  <IconButton
                    onClick={() => handleExpand(reservation.reservationId)}
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
              </ListItem>
              <Collapse
                in={expandedId === reservation.reservationId}
                timeout="auto"
                unmountOnExit
              >
                <Box style={{ padding: 15 }}>
                  <Typography variant="body2" color="textPrimary" gutterBottom>
                    Details:
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Reservation ID: {reservation.reservationId}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Item ID: {reservation.item.id}
                  </Typography>
                  {/* Add more details here as needed */}
                </Box>
              </Collapse>
            </Paper>
          ))}
        </List>
      </Box>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Reservation?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are you sure you want to delete reservation for "${reservationToDelete
              ?.item.title}" starting on ${formatDate(
              reservationToDelete?.start || "",
            )}, ending on ${formatDate(reservationToDelete?.end || "")}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserReservationsPage;
