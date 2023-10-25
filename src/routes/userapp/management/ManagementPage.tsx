import React, { useState } from "react";
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
} from "@mui/material";
import { ExpandMore, Delete } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import useUserReservedItems from "./useUserReservedItems";
import { UserReservation } from "../types";

function CommentsDisplay() {
  const { data: reservations } = useUserReservedItems();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { storeId } = useParams();

  const handleExpand = (reservationId: string) => {
    setExpandedId((prev) => (prev === reservationId ? null : reservationId));
  };

  const handleDelete = (reservationId: string) => {
    console.log(`Deleted reservation with ID: ${reservationId}`);
    // Add your delete logic here
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <List>
      {reservations.map((reservation: UserReservation) => (
        <div key={reservation.reservationId}>
          <Paper style={{ padding: 15, marginBottom: 15 }}>
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
              <IconButton
                onClick={() => handleExpand(reservation.reservationId)}
                aria-label="expand"
              >
                <ExpandMore />
              </IconButton>
              <IconButton
                onClick={() => handleDelete(reservation.reservationId)}
                aria-label="delete"
              >
                <Delete />
              </IconButton>
              <Link to={`/userapp/${storeId}/${reservation.item.id}`}>
                <Button variant="outlined" color="primary">
                  Item info
                </Button>
              </Link>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleExpand(reservation.reservationId)}
              >
                Details
              </Button>
            </ListItem>
          </Paper>
          <Collapse in={expandedId === reservation.reservationId}>
            <Paper style={{ padding: 15 }}>
              <Typography variant="body2" color="textPrimary" gutterBottom>
                Details:
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Reservation ID: {reservation.reservationId}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Item ID: {reservation.item.id}
              </Typography>
              {/* Add more details here as needed */}
            </Paper>
          </Collapse>
        </div>
      ))}
    </List>
  );
}

export default CommentsDisplay;
