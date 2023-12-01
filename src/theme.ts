import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small",
      },
    },
    MuiButton: {
      defaultProps: {
        size: "small",
      },
    },
  },
});

export default theme;
