import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { useHistory } from "react-router-dom";

import {
  Box,
  Card,
  Typography,
  makeStyles,
  Button,
  colors,
  Hidden,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  profit: {
    color: colors.green[500],
  },
  loss: {
    color: colors.red[500],
  },
}));

const SchemeJoined = ({ className, product, data, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = () => {
    history.push(`/house/${data.houseid} `);
  };
  return (
    <Card className={clsx(classes.root, className)} {...rest} elevation={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography color="textPrimary" variant="h4" align="left">
          ₹{Number(data.housepool).toLocaleString("en-IN")}
        </Typography>
        <Typography variant="subtitle1">
          {data.profitloss > 0 ? (
            <>
              <Typography className={classes.profit} variant="h5">
                {"₹" +
                  Number(Math.abs(data.profitloss)).toLocaleString("en-IN")}
                <Hidden xsDown>
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    display="inline"
                    align="center"
                  >
                    <ArrowDropUpIcon />
                    {"+" +
                      ((data.profitloss * 100) / data.housepool).toFixed(2) +
                      "%"}
                  </Typography>
                </Hidden>
              </Typography>
            </>
          ) : (
            <Typography className={classes.loss} variant="h4">
              {"₹" + Number(Math.abs(data.profitloss)).toLocaleString("en-IN")}
              <ArrowDropDownIcon />
              <Hidden xsDown>
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  display="inline"
                  align="center"
                >
                  {((data.profitloss * 100) / data.housepool).toFixed(2) + "%"}
                </Typography>
              </Hidden>
            </Typography>
          )}
        </Typography>
        <Hidden xsDown>
          <Typography color="textSecondary" variant="subtitle1" align="right">
            {data.noofroundcompleted === 0
              ? "Not Started"
              : data.noofroundcompleted + "/" + data.noofmember}
          </Typography>
        </Hidden>
        <Button color="secondary" variant="contained" onClick={handleClick}>
          Bid HERE
        </Button>
      </Box>
    </Card>
  );
};

SchemeJoined.propTypes = {
  className: PropTypes.string,
};

export default SchemeJoined;
