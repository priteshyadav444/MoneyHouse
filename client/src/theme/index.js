import { createMuiTheme, colors } from "@material-ui/core";
import shadows from "./shadows";
import typography from "./typography";

const theme = createMuiTheme({
  palette: {
    background: {
      dark: "#F4F6F8",
      default: colors.common.white,
      blue: "#e1f5fe",
      paper: colors.common.white,
    },
    primary: {
      main: "#304fff",
    },
    secondary: {
      main: "#f44336",
    },
    info: {
      main: colors.green[500],
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
    },
  },
  shadows,
  typography,
});

export default theme;
