import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  List,
  ListItem,
  Typography,
  Box,
} from "@mui/material";
import {
  FixedReservationData,
  FlexibleReservationData,
  RequiredUserInfo,
  ReservationRequest,
  UserData,
} from "../types";

type Props = {
  reservationRequest: ReservationRequest;
  requiredUserInfo: RequiredUserInfo;
  makeReservationRequest: (data: ReservationRequest) => void;
};

export function ReservationDialog({
  reservationRequest,
  requiredUserInfo,
  makeReservationRequest,
}: Props) {
  const [filledUserData, setFilledUserData] = useState<UserData>(
    reservationRequest.userData,
  );

  const handleInputChange = (key: keyof UserData, value: string) => {
    setFilledUserData((prev) => ({ ...prev, [key]: value }));
  };

  const isFlexibleData = (
    data: FlexibleReservationData | FixedReservationData,
  ): data is FlexibleReservationData => {
    return (data as FlexibleReservationData).start !== undefined;
  };

  return (
    <Dialog
      open
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: "10px" } }}
    >
      <DialogTitle>Reservation</DialogTitle>
      <DialogContent>
        <Box mb={3}>
          <Typography variant="h6">Podsumowanie:</Typography>
          {isFlexibleData(reservationRequest.reservationData) ? (
            <>
              <Typography>
                Start: {reservationRequest.reservationData.start}
              </Typography>
              <Typography>
                End: {reservationRequest.reservationData.end}
              </Typography>
            </>
          ) : (
            <List>
              {reservationRequest.reservationData.subItemList.map((item) => (
                <ListItem key={item.id}>
                  <Typography>
                    {item.title} - {item.subtitle}
                  </Typography>
                </ListItem>
              ))}
            </List>
          )}
          <Typography>
            Amount: {reservationRequest.reservationData.amount}
          </Typography>
        </Box>
        <Box mb={3}>
          <Typography variant="h6">Informacje:</Typography>
          {requiredUserInfo.map((infoKey) => (
            <TextField
              key={infoKey}
              label={infoKey}
              fullWidth
              margin="normal"
              onChange={(e) =>
                handleInputChange(infoKey as keyof UserData, e.target.value)
              }
            />
          ))}
          {Object.entries(filledUserData).map(([key, value]) => (
            <Typography key={key}>
              {key}: {value}
            </Typography>
          ))}
        </Box>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={() =>
            makeReservationRequest({
              ...reservationRequest,
              userData: filledUserData,
            })
          }
        >
          RESERVE
        </Button>
      </DialogContent>
    </Dialog>
  );
}
