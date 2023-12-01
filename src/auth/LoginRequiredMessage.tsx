import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAuth } from "react-oidc-context";
import { useLocation } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { useTranslation } from "react-i18next";

function LoginRequiredMessage() {
  const { t } = useTranslation();

  const auth = useAuth();
  const location = useLocation();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      padding="30px"
    >
      <Typography variant="body1">{t("auth.unauthorized")}</Typography>
      <Typography variant="h4">{t("auth.pleaseLogIn")}</Typography>
      <Button
        variant="contained"
        sx={{ m: 1, p: 1 }}
        onClick={() => {
          const currentPath = location.pathname + location.search;
          auth.signinRedirect({
            redirect_uri: `${window.location.origin}${currentPath}`,
          });
        }}
      >
        <LoginIcon sx={{ color: "#fff" }} />
        <Typography ml={1}>{t("auth.login")}</Typography>
      </Button>
    </Box>
  );
}

export default LoginRequiredMessage;
