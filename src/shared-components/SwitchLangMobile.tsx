import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function SwitchLangMobile({
  handleCloseNavMenu,
}: {
  handleCloseNavMenu: () => void;
}) {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box
      padding={0.5}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography
        ml={1}
        style={{ cursor: "pointer" }}
        onClick={() => {
          changeLanguage("en");
          handleCloseNavMenu();
        }}
      >
        EN
      </Typography>
      <Typography ml={1}>|</Typography>
      <Typography
        ml={1}
        style={{ cursor: "pointer" }}
        onClick={() => {
          changeLanguage("pl");
          handleCloseNavMenu();
        }}
      >
        PL
      </Typography>{" "}
    </Box>
  );
}

export default SwitchLangMobile;
