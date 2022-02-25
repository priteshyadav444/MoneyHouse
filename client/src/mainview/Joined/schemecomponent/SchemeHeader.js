import React from "react";

import { Box, Card, Typography, makeStyles, Hidden } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

const SchemeHeader = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography color="textPrimary" variant="h5">
          Pool
        </Typography>
        <Typography color="textPrimary" variant="h5">
          P/L
        </Typography>
        <Hidden xsDown>
          <Typography color="textPrimary" variant="h5">
            Bid Round
          </Typography>
        </Hidden>

        <Typography color="textPrimary" variant="h5">
          Details
        </Typography>
      </Box>
    </Card>
  );
};

export default SchemeHeader;
