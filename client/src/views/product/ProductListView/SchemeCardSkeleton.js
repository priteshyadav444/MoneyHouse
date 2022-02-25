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
    width: "100%",
    marginTop: theme.spacing(0.5),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(0.5),
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
      <CardContent>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="subtitle1"
            align="left"
          >
            House Pool
            <Typography
              color="textPrimary"
              variant="h4"
              align="left"
              mt="5"
              display="block"
            >
              <Skeleton
                animation="wave"
                variant="rect"
                height={25}
                width={200}
              />
            </Typography>
          </Typography>

          <Typography
            color="textSecondary"
            gutterBottom
            variant="subtitle1"
            align="right"
          >
            Entry
            <br />
            <Skeleton animation="wave" variant="rect" height={25} width={200} />
          </Typography>
        </Box>

        <Skeleton
          animation="pulse"
          height={20}
          width="100%"
          style={{ marginBottom: 6 }}
        />

        <Box display="flex" justifyContent="space-between">
          <Typography
            color="error"
            gutterBottom
            variant="subtitle1"
            fontStyle="italic"
            display="block"
            align="left"
          >
            <Skeleton animation="wave" variant="rect" height={25} width={200} />
          </Typography>

          <Typography
            color="textSecondary"
            align="right"
            variant="subtitle1"
            display="block"
          >
            <Skeleton animation="wave" variant="rect" height={25} width={200} />
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SchemeCardSkeleton;
