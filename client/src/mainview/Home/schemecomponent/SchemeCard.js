import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";

import Portfolio from "./Portfolio";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Chip,
  LinearProgress,
  Button,
  colors,
  Snackbar,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { withStyles } from "@material-ui/styles";
import { addMemberToHouse } from "../../../action/houseAction";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  statsItem: {
    alignItems: "center",
    display: "flex",
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
  content: {
    paddingTop: theme.spacing(0.5),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(0.5),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  chip: {
    backgroundColor: colors.green[700],
    color: "#fff",
  },
}));
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 6,
    borderRadius: 10,
  },
  colorPrimary: {
    backgroundColor: "#f2f2f2",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#045de9",
    backgroundImage: "linear-gradient(315deg, #045de9 0%, #09c6f9 74%)",
  },
}))(LinearProgress);

const SchemeCard = ({
  props,
  className,
  data,
  memberid,
  addMemberToHouse,
  walletbalance,
  houseJoining,
  housejoined,

  err,
  ...rest
}) => {
  const classes = useStyles();
  const [snackOpen, setSnack] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const [errmsg, setMsg] = useState("House Joined");
  const handleClick = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (open && houseJoining !== true) {
      setOpen(false);
    }
    if (housejoined === true) {
      setMsg(null);
      setSnack(true);
    } else if (err && houseJoining === false) {
      if (err) {
        setMsg(err);
      }
      setSnack(true);
    }
    // eslint-disable-next-line
  }, [houseJoining]);
  const handleJoin = () => {
    addMemberToHouse(
      data._id,
      data.poolamount,
      data.entryamount,
      walletbalance
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBClose = () => {
    setSnack(false);
  };
  return (
    <>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleBClose}
      >
        {errmsg ? (
          <Alert onClose={handleBClose} severity="error">
            {errmsg}
          </Alert>
        ) : (
          <Alert onClose={handleBClose}> House Joined</Alert>
        )}
      </Snackbar>
      <Card className={classes.root} elevation={5}>
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
                ₹{Number(data.poolamount).toLocaleString("en-IN")}
              </Typography>
            </Typography>

            <Typography
              color="textSecondary"
              gutterBottom
              variant="subtitle2"
              align="right"
            >
              Entry
              <br />
              <Chip
                label={"₹" + Number(data.entryamount).toLocaleString("en-IN")}
                className={classes.chip}
              />
            </Typography>
          </Box>

          <BorderLinearProgress
            variant="determinate"
            value={(data.members.length * 100) / data.noofmember}
          />

          <Box display="flex" justifyContent="space-between">
            <Typography
              color="secondary"
              gutterBottom
              variant="subtitle1"
              fontStyle="italic"
              display="block"
              align="left"
            >
              {data.noofmember === data.members.length
                ? "House Full"
                : data.noofmember - data.members.length + "spots left"}
            </Typography>

            <Typography
              color="textSecondary"
              align="right"
              variant="subtitle1"
              display="block"
            >
              {data.noofmember} Spot
            </Typography>
          </Box>
        </CardContent>

        <Divider />

        <Box p={0.5}>
          <Grid container justify="space-between" spacing={2}>
            <Grid className={classes.statsItem} item>
              <AccessTimeIcon className={classes.statsIcon} color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                {moment(data.createdAt).format("lll")}
              </Typography>
            </Grid>
            <Grid item>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <div>
                  <Box display="flex" bgcolor="background.paper">
                    <Box flexGrow={1}>
                      <DialogTitle id="alert-dialog-title">
                        {"Join House"}
                      </DialogTitle>
                    </Box>
                    <Box>
                      <DialogTitle id="alert-dialog-title">
                        <Button onClick={handleClose} color="primary">
                          Close
                        </Button>
                      </DialogTitle>
                    </Box>
                  </Box>
                </div>
                <Box flexGrow={1}>
                  <DialogContent>
                    <Portfolio
                      entryamount={data.entryamount}
                      balance={walletbalance}
                    />
                  </DialogContent>
                </Box>

                <DialogActions>
                  <Button
                    variant="outlined"
                    onClick={handleJoin}
                    color="primary"
                  >
                    {houseJoining ? (
                      <CircularProgress size={25} />
                    ) : (
                      "₹" +
                      Number(data.entryamount).toLocaleString("en-IN") +
                      " Pay"
                    )}
                  </Button>
                </DialogActions>
              </Dialog>
              {data.noofmember === data.members.length ? (
                <Button
                  variant="outlined"
                  disabled="true"
                  color="secondary"
                  onClick={handleClick}
                >
                  Full
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleClick}
                >
                  join
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

SchemeCard.propTypes = {
  addMemberToHouse: PropTypes.func.isRequired,
  houseJoining: PropTypes.object.isRequired,
  housejoined: PropTypes.object.isRequired,
  err: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  housesdata: state.houses.houses,
  houseLoading: state.houses.loading,
  memberid: state.auth.member._id,
  walletbalance: state.auth.member.walletbalance,
  houseJoining: state.houses.houseJoining,
  housejoined: state.houses.housejoined,
  err: state.error.msg,
});

export default connect(mapStateToProps, { addMemberToHouse })(SchemeCard);
