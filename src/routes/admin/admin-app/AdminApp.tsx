import { useNavigate } from "react-router-dom";
import FormatListBulletedSharpIcon from "@mui/icons-material/FormatListBulletedSharp";
import CreateSharpIcon from "@mui/icons-material/CreateSharp";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";

const options = [
  {
    label: "Reservations",
    value: "reservations",
    icon: <EventSeatIcon sx={{ fontSize: "5rem" }} />,
  },
  {
    label: "Item list",
    value: "item-list",
    icon: <FormatListBulletedSharpIcon sx={{ fontSize: "5rem" }} />,
  },
  {
    label: "New item",
    value: "add-item",
    icon: <CreateSharpIcon sx={{ fontSize: "5rem" }} />,
  },
];

function AdminApp() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} marginTop={4}>
        {options.map((option) => {
          return (
            <Grid
              key={option.value}
              item
              xs={6}
              md={3}
              sx={{ cursor: "pointer" }}
            >
              <Paper
                onClick={() => navigate(option.value)}
                sx={{ paddingY: 1 }}
              >
                <Stack
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                  gap={3}
                >
                  <Box>{option.icon}</Box>
                  <Typography
                    fontSize="1.75rem"
                    letterSpacing="1px"
                    textTransform="uppercase"
                  >
                    {option.label}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default AdminApp;
