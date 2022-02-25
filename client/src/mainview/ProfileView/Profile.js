import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { deepOrange } from "@material-ui/core/colors";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    margin: theme.spacing(3),
  },
  avatar: {
    height: 100,
    width: 100,
    backgroundColor: deepOrange[500],
  },
}));

const Profile = ({ firstname, lastname, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar}>
            <Typography color="inherit" variant="h1">
              {firstname.charAt(0).toUpperCase()}
            </Typography>
          </Avatar>
          <Typography color="textPrimary" gutterBottom variant="h3">
            {firstname + " " + lastname.charAt(0).toUpperCase()}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            Gujarat, INDIA
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
