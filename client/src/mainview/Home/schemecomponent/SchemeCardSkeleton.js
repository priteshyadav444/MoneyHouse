import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

import {
  Box,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(0.5),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  content: {
    paddingTop: theme.spacing(0.5),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(0.5),
  },
  statsItem: {
    alignItems: "center",
    display: "flex",
  },
}));

const SchemeCardSkeleton = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Box display="flex" justifyContent="space-between">
          <Typography color="textSecondary" variant="subtitle2" align="left">
            House Pool
            <Typography
              color="textPrimary"
              variant="h4"
              align="left"
              display="block"
            >
              <Skeleton
                animation="wave"
                variant="rect"
                height={25}
                width={115}
              />
            </Typography>
          </Typography>

          <Typography color="textSecondary" variant="subtitle2" align="right">
            Entry
            <br />
            <Skeleton animation="wave" variant="rect" height={25} width={115} />
          </Typography>
        </Box>

        <Skeleton animation="pulse" height={40} width="100%" />

        <Box display="flex" justifyContent="space-between">
          <Skeleton animation="pulse" height={40} width="100%" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SchemeCardSkeleton;
