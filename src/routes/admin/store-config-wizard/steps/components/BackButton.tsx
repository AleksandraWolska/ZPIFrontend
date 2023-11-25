import { IconButton } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <IconButton
      sx={{
        top: 0,
        left: 10,
        position: "absolute",
        "@media (max-width: 500px)": {
          position: "static",
          alignSelf: "flex-start",
        },
      }}
      onClick={onClick}
    >
      <ArrowBack />
    </IconButton>
  );
}

export default BackButton;
