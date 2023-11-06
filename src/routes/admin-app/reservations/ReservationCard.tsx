import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";
import { styled } from "@mui/system";
import { Reservation } from "../../../types";
import useStoreConfig from "../useStoreConfig";
import useItemById from "./useItemById";
import theme from "../../../theme";
import ItemImage from "../components/ItemImage";

function ReservationCard({
  reservation,
  setReservationToBeConfirmed,
}: {
  reservation: Reservation;
  setReservationToBeConfirmed: (id: string) => void;
}) {
  const item = useItemById(reservation.itemId);

  const storeConfig = useStoreConfig();

  const isPast = new Date(reservation.startDateTime) < new Date();

  return (
    <Card>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack
            direction="row"
            alignItems="center"
            width="100%"
            sx={{ color: isPast ? theme.palette.text.secondary : "auto" }}
          >
            <Typography variant="h5" sx={{ width: "33%", flexShrink: 0 }}>
              {item.attributes.title}
            </Typography>

            <Stack direction="row" sx={{ width: "33%", flexShrink: 0 }}>
              <ReservationDate date={reservation.startDateTime} />
              {reservation.endDateTime && (
                <Stack direction="row" marginLeft={1} gap={1}>
                  - <ReservationDate date={reservation.endDateTime} />
                </Stack>
              )}
            </Stack>

            {storeConfig.authConfig.confirmationRequired &&
              !reservation.confirmed && (
                <Button
                  sx={{ marginLeft: "auto", marginRight: 2 }}
                  variant="contained"
                  onClick={(e) => {
                    e.stopPropagation();
                    setReservationToBeConfirmed(reservation.id);
                  }}
                >
                  Confirm
                </Button>
              )}
          </Stack>
        </AccordionSummary>

        <AccordionDetails
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <DetailsBox>
            <DetailsBoxTitle>Item</DetailsBoxTitle>

            <Stack direction="row" gap={2}>
              <Box
                sx={{
                  width: "150px",
                  height: "150px",
                  padding: 0.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                style={{ border: "2px solid black" }}
              >
                <ItemImage
                  image={item.attributes.image}
                  title={item.attributes.title}
                />
              </Box>

              <Box>
                <Typography fontSize={18}>{item.attributes.title}</Typography>

                {item.attributes.subtitle && (
                  <Typography
                    fontSize={18}
                    color={theme.palette.text.secondary}
                  >
                    {item.attributes.subtitle}
                  </Typography>
                )}

                <Typography marginTop={2}>ID: {item.id}</Typography>

                {item.customAttributeList.map((attr) => {
                  return (
                    <Box key={attr.id} marginTop={1}>
                      <Typography
                        color={theme.palette.text.secondary}
                        fontSize={14}
                      >
                        {attr.name.toUpperCase()}
                      </Typography>

                      <Typography>{`${attr.value}`}</Typography>
                    </Box>
                  );
                })}
              </Box>
            </Stack>
          </DetailsBox>
          <Divider orientation="vertical" variant="middle" flexItem />
          <DetailsBox>
            <DetailsBoxTitle>Client</DetailsBoxTitle>

            <Box marginTop={2}>
              {Object.entries(reservation.personalData).map(([key, value]) => {
                return (
                  <Box key={key} marginTop={1}>
                    <Typography
                      color={theme.palette.text.secondary}
                      fontSize={14}
                    >
                      {key.toUpperCase()}
                    </Typography>

                    <Typography>{value}</Typography>
                  </Box>
                );
              })}
            </Box>

            {reservation.message && (
              <Box marginTop={1}>
                <Typography color={theme.palette.text.secondary} fontSize={14}>
                  MESSAGE
                </Typography>

                <Typography>{reservation.message}</Typography>
              </Box>
            )}
          </DetailsBox>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
}

function ReservationDate({ date }: { date: string }) {
  return <Typography>{dayjs(date).format("DD.MM.YYYY HH:mm")}</Typography>;
}

const DetailsBox = styled(Box)({
  width: "50%",
});

// eslint-disable-next-line @typescript-eslint/no-shadow
const DetailsBoxTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "thin",
  letterSpacing: "2px",
  color: theme.palette.text.secondary,
  fontSize: "1.4rem",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

export default ReservationCard;
