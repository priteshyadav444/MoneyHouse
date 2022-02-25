import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
} from "@material-ui/core";
import { connect } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Logo from "../../components/Logo";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#304ffe",
  },
  avatar: {
    width: 60,
    height: 60,
  },
}));

const TopBar = ({ className, onMobileNavOpen, adminLogout }) => {
  const classes = useStyles();

  const handleClick = () => {
    // adminLogout();
    window.location.href = "/dashboard/login";
  };

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0}>
      <Toolbar>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden>
          <IconButton color="inherit" onClick={handleClick}>
            <ExitToAppIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
  isAdminAutenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isAdminAutenticated: state.authAdmin.isAdminAutenticated,
});

export default connect(mapStateToProps)(TopBar);
