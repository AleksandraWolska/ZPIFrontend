import InfoIcon from "@mui/icons-material/Info";
import { IconButton } from "@mui/material";

function InfoButton({ onClick }: { onClick: () => void }) {
  return (
    <IconButton
      sx={{
        top: 0,
        right: 15,
        position: "absolute",
        "@media (max-width: 500px)": {
          position: "static",
        },
      }}
      size="small"
      onClick={onClick}
    >
      <InfoIcon />
    </IconButton>
  );
}

export default InfoButton;
