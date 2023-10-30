import { Dialog, Box } from "@mui/material";
import ActionsAuth from "../../user-app-auth/ActionsAuth";
import useAuthConfig from "../../user-app-auth/useAuthConfig";

export function ReservationDialog() {
  return (
    <Dialog
      open
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: "10px" } }}
    >
      <ActionsAuth>
        <ReservationForm />
      </ActionsAuth>
    </Dialog>
  );
}

function ReservationForm() {
  const authConfig = useAuthConfig();

  return (
    <Box>
      {authConfig.requireAuthForActions ? (
        <Box>
          Jesli to widzisz, to znaczy ze do wykonania akcji potrzebne jest
          logowanie i user faktycznie jest zalogowany
        </Box>
      ) : (
        <Box>
          Jesli to widzisz, to znaczy ze do wykonania akcji NIE JEST potrzebne
          logowanie i trzeba wyswietlic odpowiednie pola na podstawie
          requiredPersonalData
        </Box>
      )}
    </Box>
  );
}
