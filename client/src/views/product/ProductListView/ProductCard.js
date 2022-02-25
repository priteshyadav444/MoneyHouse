import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Chip,
  LinearProgress,
  colors,
  makeStyles,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",

    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  content: {
    paddingTop: theme.spacing(0.5),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(0.5),
  },
  chip: {
    backgroundColor: colors.green[700],
    color: "#fff",
  },
  statsItem: {
    alignItems: "center",
    display: "flex",
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ProductCard = ({ className, data, ...rest }) => {
  const classes = useStyles();

  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#1a90ff",
    },
  }))(LinearProgress);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent className={classes.content}>
        <Box display="flex" justifyContent="space-between">
          <Typography
            color="textPrimary"
            gutterBottom
            variant="subtitle1"
            align="left"
          >
            House Pool
            <Typography
              color="initial"
              variant="h2"
              align="left"
              mt="4"
              display="block"
            >
              ₹{Number(data.poolamount).toLocaleString("en-IN")}
            </Typography>
          </Typography>

          <Typography color="textPrimary" align="right" variant="subtitle1">
            Entry
            <Typography
              color="initial"
              variant="h2"
              align="left"
              display="block"
            >
              <Chip
                label={"₹" + Number(data.entryamount).toLocaleString("en-IN")}
                className={classes.chip}
              />
            </Typography>
          </Typography>
        </Box>

        <BorderLinearProgress
          variant="determinate"
          value={(data.members.length * 100) / data.noofmember}
        />

        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography
            variant="subtitle1"
            fontStyle="italic"
            display="block"
            align="left"
          >
            {data.members.length}
          </Typography>

          <Typography
            color="initial"
            align="right"
            variant="subtitle1"
            display="block"
          >
            {data.noofmember}
          </Typography>
        </Box>
      </CardContent>

      <Divider />

      <Box p={1}>
        <Grid container justify="space-between" spacing={1}>
          <Grid className={classes.statsItem} item>
            <AccessTimeIcon className={classes.statsIcon} color="action" />
            <Typography color="textSecondary" display="inline" variant="body2">
              {Date(data.createdAt)}
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item>
            <Typography color="error" display="inline" variant="body2">
              <DeleteIcon />
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
};

export default ProductCard;
