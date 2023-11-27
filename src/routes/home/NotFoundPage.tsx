import React, { useState } from "react";
import {
  Typography,
  Box,
  ListItem,
  ListItemText,
  Container,
  List,
  useTheme,
  IconButton,
  Divider,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import AdminActionBox from "../admin/components/AdminActionBox";
import { StoreSummary } from "../../types";

function NotFoundPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const data = useLoaderData() as { allStores: StoreSummary[] };

  const [openUserAppList, setOpenUserAppList] = useState(false);
  const options = [
    {
      label: "Project Homepage",
      description: "Go to main project page",
      value: "/",
      icon: <HomeIcon sx={{ fontSize: "5rem", color: "grey" }} />,
    },
    {
      label: "Admin application",
      description: "Manage your stores or create new",
      value: "/admin",
      icon: <PersonIcon sx={{ fontSize: "5rem", color: "grey" }} />,
    },
  ];

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        {" "}
        <Typography variant="h1">404</Typography>
        <Typography variant="h5" mb={2}>
          Sorry but this URL dont work. What about...
        </Typography>
        {options.map((option) => (
          <ListItem
            key={option.value}
            onClick={() => navigate(option.value)}
            sx={{ cursor: "pointer" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                boxShadow: 3,
                borderRadius: "10px",
                padding: 2,
                bgcolor: "white",
                "&:hover": {
                  bgcolor: "grey.100",
                },
                marginBottom: 2,
              }}
            >
              <Box sx={{ margin: 1, marginRight: 3 }}>{option.icon}</Box>
              <ListItemText
                primary={<Typography variant="h5">{option.label}</Typography>}
                secondary={
                  <Typography variant="body1" color="grey">
                    {option.description}
                  </Typography>
                }
              />
            </Box>
          </ListItem>
        ))}
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box
            onClick={() => setOpenUserAppList(!openUserAppList)}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              m: 2,
              mb: 1,
            }}
          >
            <Typography variant="h5">
              Expand to view apps created using this system
            </Typography>
            <IconButton aria-label="expand">
              <ExpandMoreIcon
                style={{
                  transform: openUserAppList
                    ? "rotate(0deg)"
                    : "rotate(180deg)",
                }}
              />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Collapse in={openUserAppList}>
            <React.Suspense fallback={<p>Loading stores list...</p>}>
              <Await
                resolve={data.allStores}
                errorElement={<p>Error loading stores</p>}
              >
                {(userApps) => (
                  <>
                    {userApps.length === 0 && (
                      <Typography m={2} variant="body1">
                        There is no stores yet
                      </Typography>
                    )}

                    <List>
                      {userApps.map((userApp: StoreSummary) => {
                        return (
                          <ListItem
                            key={userApp.storeConfigId}
                            onClick={() =>
                              navigate(`/userapp/${userApp.storeConfigId}`)
                            }
                          >
                            <AdminActionBox theme={theme}>
                              <Box sx={{ margin: 1, marginRight: 3 }}>
                                <StoreIcon
                                  sx={{ fontSize: "5rem", color: "grey" }}
                                />
                              </Box>
                              <ListItemText
                                primary={
                                  <Typography variant="h4">
                                    {userApp.name}
                                  </Typography>
                                }
                                secondary={
                                  <Typography variant="body1" color="grey">
                                    Manage your items, reservation in already
                                    existing store
                                  </Typography>
                                }
                              />
                            </AdminActionBox>
                          </ListItem>
                        );
                      })}
                    </List>
                  </>
                )}
              </Await>
            </React.Suspense>
          </Collapse>
        </Box>
      </Box>
    </Container>
  );
}

export default NotFoundPage;
