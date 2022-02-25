import React from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  Avatar,
  IconButton,
  Drawer,
  colors,
} from "@material-ui/core";
import Logo from "../../components/Logo";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MenuIcon from "@material-ui/icons/Menu";
import ListDrawer from "./ListDrawer";
import { Hidden } from "@material-ui/core";
import NotificationLayout from "./NotificationLayout";
import HomeIcon from "@material-ui/icons/Home";
import {
  notificationClick,
  notificationLoad,
} from "../../action/authMemberAction";

import UserAvatar from "react-user-avatar";
const useStyles = makeStyles((theme) => ({
  root: {},
  toolbar: {
    height: 60,
  },
  grow: {
    flexGrow: 1,
  },
  color: {
    color: "#304ffe",
    backgroundColor: "#fff",
  },
  list: {
    width: 250,
  },

  red: {
    backgroundColor: colors.red[400],
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const TopBar = ({
  back,
  membername,
  lastname,
  notification,
  notificationClick,
  notificationLoad,
  imgurl,
}) => {
  const classes = useStyles();
  let history = useHistory();
  const [state, setState] = React.useState(false);
  const handleClick = () => {
    history.push("/account");
  };
  const toggleDrawer = (action) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(action);
  };
  console.log(imgurl);
  return (
    <>
      <AppBar elevation={5}>
        <Toolbar>
          {back ? (
            <>
              <IconButton onClick={() => history.goBack()}>
                <Avatar className={classes.color}>
                  <ArrowBackIosIcon />
                </Avatar>
              </IconButton>
              <IconButton onClick={() => history.push("/home")}>
                <Avatar className={classes.color}>
                  <HomeIcon />
                </Avatar>
              </IconButton>
              <div className={classes.grow} />
              <Hidden xsDown>
                <IconButton color="inherit">
                  <Typography color="secondary" varient="h6">
                    Hello, {membername}
                  </Typography>
                </IconButton>
              </Hidden>
              <NotificationLayout
                linkset="/"
                membername={membername}
                notification={notification}
                notificationClick={notificationClick}
                notificationLoad={notificationLoad}
              />
            </>
          ) : (
            <>
              <Hidden lgUp>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  className={classes.menuButton}
                  onClick={toggleDrawer(true)}
                  autoFocues="false"
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>

              <Link to="/home" color="textPrimary">
                <Logo />
              </Link>
              <div className={classes.grow} />
              <Hidden xsDown>
                <IconButton color="inherit">
                  <Typography color="inherit" varient="h6">
                    Hello, {membername}
                  </Typography>
                </IconButton>
              </Hidden>

              <NotificationLayout
                linkset="./"
                membername={membername}
                notification={notification}
                notificationClick={notificationClick}
                notificationLoad={notificationLoad}
              />

              <IconButton color="inherit" onClick={handleClick}>
                {imgurl !== "null" ? (
                  <UserAvatar size="40" name="pp" src={imgurl} />
                ) : (
                  <Avatar className={classes.red}>
                    {membername.charAt(0).toUpperCase() +
                      "" +
                      lastname.charAt(0).toUpperCase()}
                  </Avatar>
                )}
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
        <div className={classes.list} onClick={toggleDrawer(false)}>
          <ListDrawer />
        </div>
      </Drawer>
    </>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};
TopBar.propTypes = {
  memberRegister: PropTypes.func.isRequired,
  isMemberAutenticated: PropTypes.bool.isRequired,
  membername: PropTypes.object.isRequired,
  lastname: PropTypes.object.isRequired,
  imgurl: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  isMemberLoading: PropTypes.func.isRequired,
  notificationLoad: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isMemberAutenticated: state.auth.isMemberAutenticated,
  membername: state.auth.member.firstname,
  lastname: state.auth.member.lastname,
  imgurl: state.auth.member.imgurl,
  notification: state.auth.member.notifications,
  isMemberLoading: state.auth.isMemberLoading,
});
export default connect(mapStateToProps, {
  notificationClick,
  notificationLoad,
})(TopBar);
