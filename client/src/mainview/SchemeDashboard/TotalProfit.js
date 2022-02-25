import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors,
} from "@material-ui/core";
import InsertChartIcon from "@material-ui/icons/InsertChartOutlined";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.green[800],
    height: 56,
    width: 56,
  },
  profit: {
    color: colors.green[500],
  },
  loss: {
    color: colors.red[500],
  },
}));

const TotalProfit = ({ profitloss, poolamount, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TOTAL PROFIT/LOST
            </Typography>

            {profitloss > 0 ? (
              <>
                <Typography className={classes.profit} variant="h3">
                  {"₹" + Number(Math.abs(profitloss)).toLocaleString("en-IN")}
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    display="inline"
                    align="center"
                  >
                    <ArrowDropUpIcon />{" "}
                    {"+" + ((profitloss * 100) / poolamount).toFixed(2) + "%"}
                  </Typography>
                </Typography>
              </>
            ) : (
              <Typography className={classes.loss} variant="h3">
                {"₹" + Number(Math.abs(profitloss)).toLocaleString("en-IN")}
                <ArrowDropDownIcon />
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  display="inline"
                  align="center"
                >
                  {((profitloss * 100) / poolamount).toFixed(2) + "%"}
                </Typography>
              </Typography>
            )}
          </Grid>

          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string,
};

export default TotalProfit;
