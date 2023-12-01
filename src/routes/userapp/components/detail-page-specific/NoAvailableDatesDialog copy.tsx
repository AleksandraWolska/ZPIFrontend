import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import useItemDetails from "../../details-page/useItemDetails";

type Props = {
  setShowNoAvailableDatesDialog: () => void;
  userCount: number;
};
export function NoAvailableDatesDialog({
  setShowNoAvailableDatesDialog,
  userCount,
}: Props) {
  const item = useItemDetails();

  return (
    <Dialog
      open
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: "10px" } }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "medium" }}>
        <Typography variant="h4">{`We're sorry`}</Typography>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Box mb={3}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            There is no available dates for this item
          </Typography>
          {userCount > 1 && (
            <Typography variant="h6" sx={{ mb: 1 }}>
              You can try reduce amount of users
            </Typography>
          )}
          <Box>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              {item.attributes.title}
            </Typography>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          </Box>
        </Box>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={() => {
            setShowNoAvailableDatesDialog();
          }}
        >
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
}
