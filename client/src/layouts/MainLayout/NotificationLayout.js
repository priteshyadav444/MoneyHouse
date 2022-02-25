import React from "react";
import Box from "@material-ui/core/Box";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import NotificationsIcon from "@material-ui/icons/Notifications";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import GavelIcon from "@material-ui/icons/Gavel";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import HouseIcon from "@material-ui/icons/House";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import {
  Avatar,
  Badge,
  colors,
  IconButton,
  ListItemAvatar,
  ListSubheader,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 360,
    maxHeight: 500,
    backgroundColor: theme.palette.background.paper,
  },

  green: {
    backgroundColor: colors.green[500],
  },
  join: {
    backgroundColor: colors.purple[400],
  },
  red: {
    backgroundColor: colors.red[500],
  },
  orange: {
    backgroundColor: colors.yellow[900],
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),

    color: theme.palette.grey[500],
  },
  pop: {
    marginTop: theme.spacing(6),
  },
}));

export default function NotificationLayout({
  membername,
  notification,
  notificationClick,
  notificationLoad,
  linkset,
}) {
  const classes = useStyles();
  const [state, setState] = useState(false);
  const handleClick = () => {
    notificationLoad();
    notificationClick();
    setState(true);
  };
  const handleClickItem = () => {
    setState(false);
  };
  return (
    <>
      <div onClick={handleClick}>
        <IconButton color="inherit">
          {notification.notificationcount > 0 ? (
            <Badge
              badgeContent={notification.notificationcount}
              color="secondary"
              variant="standard"
            >
              <NotificationsIcon color="inherit" />
            </Badge>
          ) : (
            <Badge color="secondary" variant="standard">
              <NotificationsIcon onClick={handleClick} />
            </Badge>
          )}
        </IconButton>
      </div>
      <Popover
        open={state}
        className={classes.pop}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleClickItem}
      >
        <Box p={1}>
          <List
            component="nav"
            aria-label="secondary mailbox folders"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Notification
                <IconButton
                  aria-label="close"
                  onClick={handleClickItem}
                  className={classes.closeButton}
                >
                  <CloseIcon />
                </IconButton>
              </ListSubheader>
            }
            className={classes.root}
          >
            <Divider />

            {notification.messages
              .slice(0)
              .reverse()
              .map((message) => {
                return (
                  <>
                    <ListItem
                      button
                      component={Link}
                      onClick={handleClickItem}
                      to={
                        message.type === "credit"
                          ? linkset + "wallet"
                          : message.type === "bid"
                          ? linkset + "house/" + message.houseid
                          : message.type === "join"
                          ? linkset + "house/" + message.houseid
                          : message.type === "pending"
                          ? linkset + "wallet"
                          : message.type === "failed"
                          ? linkset + "wallet"
                          : message.type === "ac"
                          ? linkset + "home"
                          : message.type === "declined"
                          ? linkset + "wallet"
                          : ""
                      }
                    >
                      <ListItemAvatar>
                        {message.type === "credit" ? (
                          <Avatar className={classes.green}>
                            <CallReceivedIcon />
                          </Avatar>
                        ) : message.type === "bid" ? (
                          <Avatar className={classes.red}>
                            <GavelIcon />
                          </Avatar>
                        ) : message.type === "join" ? (
                          <Avatar className={classes.join}>
                            <HouseIcon />
                          </Avatar>
                        ) : message.type === "pending" ? (
                          <Avatar className={classes.orange}>
                            <QueryBuilderIcon />
                          </Avatar>
                        ) : message.type === "failed" ? (
                          <Avatar className={classes.red}>
                            <ErrorIcon />
                          </Avatar>
                        ) : message.type === "ac" ? (
                          <Avatar className={classes.green}>
                            <CheckCircleOutlineIcon />
                          </Avatar>
                        ) : message.type === "declined" ? (
                          <Avatar className={classes.red}>
                            <ErrorIcon />
                          </Avatar>
                        ) : (
                          ""
                        )}
                      </ListItemAvatar>
                      <ListItemText
                        primary={message.data}
                        secondary="" //timing
                      />
                    </ListItem>
                    <Divider />
                  </>
                );
              })}
          </List>
        </Box>
      </Popover>
    </>
  );
}
