import { Outlet, useNavigation } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function GlobalLoadingIndicator() {
  const navigation = useNavigation();

  return navigation.state === "loading" ? (
    <CircularProgress
      size={40}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "grey",
      }}
    />
  ) : (
    <Outlet />
  );
}

export default GlobalLoadingIndicator;
