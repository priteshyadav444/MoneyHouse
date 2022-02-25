import React, { useState } from "react";
import { Hidden, makeStyles } from "@material-ui/core";
import TopBar from "./TopBar";
import BottomNavbar from "./BottomNavbar";
import NavBar from "./NavBar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 32,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 240,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
  // root: {
  //   backgroundColor: theme.palette.background.default,
  //   display: "flex",
  //   height: "100%",
  //   overflow: "hidden",
  //   width: "100%",
  // },
  // wrapper: {
  //   display: "flex",
  //   flex: "1 1 auto",
  //   overflow: "hidden",
  //   paddingTop: 64,
  // },
  // contentContainer: {
  //   display: "flex",
  //   flex: "1 1 auto",
  //   overflow: "hidden",
  // },
  // content: {
  //   flex: "1 1 auto",
  //   height: "100%",
  //   overflow: "auto",
  // },
}));

const MainLayout = (props) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={classes.root}>
      <TopBar back={props.back} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>{props.children}</div>
          {!props.back ? (
            <Hidden mdUp>
              <BottomNavbar navTo={props.value} />
            </Hidden>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
