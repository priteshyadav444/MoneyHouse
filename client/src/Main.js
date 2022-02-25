import { Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";

import BottomNavbar from "./Component/BottomNavbar";

import TabSlider from "./Component/TabSlider";

export default function Main() {
  const useStyles = makeStyles((theme) => ({
    root: {
      maxHeight: "100%",
    },
  }));

  return (
    <>
      <TabSlider />

      <BottomNavbar navTo="home" />
    </>
  );
}
