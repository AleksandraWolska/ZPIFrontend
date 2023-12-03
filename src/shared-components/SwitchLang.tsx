import LanguageIcon from "@mui/icons-material/Language";
import { MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

function SwitchLang() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <LanguageIcon />
      <Select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        sx={{
          color: "#fff",
          "& .MuiSelect-icon": {
            color: "#fff",
          },
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
        }}
      >
        <MenuItem value="en">EN</MenuItem>
        <MenuItem value="pl">PL</MenuItem>
      </Select>
    </>
  );
}

export default SwitchLang;
