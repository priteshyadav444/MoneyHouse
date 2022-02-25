import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
  Button,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import AttachMoneyTwoToneIcon from "@material-ui/icons/AttachMoneyTwoTone";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56,
  },
  differenceIcon: {
    color: colors.green[900],
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1),
  },
}));

const Payment = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Pool Monthly Payment
            </Typography>
            <Typography color="textPrimary" variant="h4">
              ₹ 20,000 /-
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              This Month Payment Status
            </Typography>
            <Typography color="secondary" variant="h4">
              Pending
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            ></Typography>
            <Button size="large" variant="outlined" color="secondary">
              <AttachMoneyTwoToneIcon />
              Pay
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Payment;
