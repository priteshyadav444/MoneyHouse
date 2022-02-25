import "react-perfect-scrollbar/dist/css/styles.css";
import React from "react";
import GlobalStyles from "./components/GlobalStyles";
import { Provider } from "react-redux";
import store from "./store";
import theme from "./theme";
import { ThemeProvider } from "@material-ui/core";
import routes from "./routes";

const App = () => {
  const routing = routes;

  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {routing}
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
