import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import BarChartIcon from "@material-ui/icons/BarChart";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { AppBar } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    background: red,
  },
});

export default function BottomNavbar(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.navTo);

  const handleChange = (event, newValue) => {};
  useEffect(() => {
    setValue(props.navTo);
  }, [props.navTo]);

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <BottomNavigation value={value} onChange={handleChange}>
            <BottomNavigationAction
              to="/home"
              component={Link}
              label="Home"
              value="home"
              icon={<HomeRoundedIcon />}
            />
            <BottomNavigationAction
              to="/portfolio"
              component={Link}
              label="Portfolio"
              value="joined"
              icon={<BarChartIcon />}
            />
            <BottomNavigationAction
              to="/wallet"
              component={Link}
              label="Wallet"
              value="wallet"
              icon={<AccountBalanceWalletIcon />}
            />
            <BottomNavigationAction
              to="/account"
              component={Link}
              label="Account"
              value="ac"
              icon={<AccountCircleIcon />}
            />
          </BottomNavigation>
        </AppBar>
      </div>
    </>
  );
}
