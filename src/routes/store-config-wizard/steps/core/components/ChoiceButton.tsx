import { Button } from "@mui/material";

function ChoiceButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <Button
      sx={{
        margin: 1.25,
        width: "40%",
      }}
      variant="contained"
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

export default ChoiceButton;
