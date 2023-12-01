import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
} from "@mui/material";

function ConfirmDialog({
  isOpen,
  onCancel,
  onConfirm,
  title,
  message,
  confirmText = "confirm",
  cancelText = "cancel",
  dialogColor = "primary",
}: {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  dialogColor?: "primary" | "error";
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: "10px" } }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "medium" }}>
        <Typography variant="h4">{title}</Typography>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Typography>{message}</Typography>
      </DialogContent>
      <Box sx={{ display: "flex", flexDirection: "row", p: 2 }}>
        <Button
          color={dialogColor}
          variant="outlined"
          sx={{ flex: 1, mr: 0.5 }}
          onClick={onCancel}
        >
          {cancelText}
        </Button>
        <Button
          color={dialogColor}
          variant="contained"
          sx={{ flex: 1, ml: 0.5 }}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </Box>
    </Dialog>
  );
}

export default ConfirmDialog;
