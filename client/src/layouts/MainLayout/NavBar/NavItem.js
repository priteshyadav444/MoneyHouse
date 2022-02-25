import React from "react";
import { NavLink } from "react-router-dom";

import PropTypes from "prop-types";
import Divider from "@material-ui/core/Divider";
import {
  Avatar,
  colors,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightRegular,
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  color: {
    margin: theme.spacing(1),
  },
  red: {
    backgroundColor: colors.red[500],
  },
  orange: {
    backgroundColor: colors.orange[900],
  },
  green: {
    backgroundColor: colors.green[500],
  },
  blue: {
    backgroundColor: colors.blue[500],
  },

  title: {
    marginRight: "auto",
  },

  active: {
    color: theme.palette.text.primary,
    backgroundColor: colors.cyan[50],
    "& $title": {
      fontWeight: theme.typography.fontWeightBold,
    },
  },
}));

const NavItem = ({
  className,
  href,
  icon: Icon,
  colorname,
  title,
  secondarytitle,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <>
      <ListItem
        button
        component={NavLink}
        to={href}
        exact
        activeClassName={classes.active}
      >
        <ListItemIcon>
          {colorname === "green" ? (
            <Avatar className={classes.green}> {Icon && <Icon />}</Avatar>
          ) : colorname === "blue" ? (
            <Avatar className={classes.blue}> {Icon && <Icon />}</Avatar>
          ) : colorname === "red" ? (
            <Avatar className={classes.red}> {Icon && <Icon />}</Avatar>
          ) : colorname === "orange" ? (
            <Avatar className={classes.orange}> {Icon && <Icon />}</Avatar>
          ) : (
            ""
          )}
        </ListItemIcon>
        <ListItemText
          className={classes.title}
          primary={title}
          secondary={secondarytitle}
        />
      </ListItem>
      <Divider />
      {/* <ListItem
        className={clsx(classes.item, className)}
        disableGutters
        {...rest}
      >
        <Button
          activeClassName={classes.active}
          className={classes.button}
          component={RouterLink}
          to={href}
        >
          {Icon && <Icon className={classes.icon} size="20" />}
          <span className={classes.title}>{title}</span>
        </Button>
      </ListItem> */}
    </>
  );
};

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
};

export default NavItem;
