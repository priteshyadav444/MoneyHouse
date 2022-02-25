import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { Avatar, colors, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Options() {
  const useStyles = makeStyles((theme) => ({
    root: {},
    pap: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      flexGrow: 1,
      position: "absolute",
      top: "80px",
      width: "75%",
      alignContent: "center",
      [theme.breakpoints.down("md")]: {
        width: "85%",
      },

      backgroundColor: theme.palette.background.paper,
      overflowY: "auto",
      overflowX: "hidden",
    },
    grow: {
      flexGrow: 1,
    },
    color: {
      margin: theme.spacing(1),
    },
    green: {
      backgroundColor: theme.palette.primary.main,
    },
    red: {
      backgroundColor: colors.red[500],
    },

    orange: {
      backgroundColor: colors.green[500],
    },
    blue: {
      backgroundColor: colors.blue[500],
    },
    red1: {
      backgroundColor: colors.red[800],
    },
  }));
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.pap}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button component={Link} to="account/profile">
            <ListItemIcon>
              <Avatar className={classes.blue}>
                <PersonRoundedIcon />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary="Profile"
              secondary="Update Profile or Password"
            />
            <div className={classes.grow} />
            <ArrowForwardIosIcon />
          </ListItem>
          <Divider />

          <ListItem button component={Link} to="/account/bank-account">
            <ListItemIcon>
              <Avatar className={classes.orange}>
                <AccountBalanceIcon />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Bank Details" />
            <div className={classes.grow} />
            <ArrowForwardIosIcon />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <Avatar className={classes.red1}>
                <HelpOutlineIcon />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Help And Support" />
            <div className={classes.grow} />
            <ArrowForwardIosIcon />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/logout">
            <ListItemIcon>
              <Avatar className={classes.red}>
                <ExitToAppIcon />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Log Out" />
            <div className={classes.grow} />
            <ArrowForwardIosIcon />
          </ListItem>
          <Divider />
        </List>
      </Paper>
    </>
  );
}
