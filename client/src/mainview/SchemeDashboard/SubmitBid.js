import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  makeStyles,
  TextField,
  Button,
  Snackbar,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { submitBid } from "../../action/houseAction";
import { clearErrors } from "../../action/errorAction";
import RefreshIcon from "@material-ui/icons/Refresh";
import { getHouseMember } from "../../action/houseAction";
import { notificationLoad } from "../../action/authMemberAction";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "left",
  },
  btn: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(0.5),
  },
}));

const SubmitBid = ({
  bidtaken,
  newAdded,
  member,
  clearErrors,
  addingloading,
  errmsg,
  submitBid,
  houseid,
  entryamount,
  paymentdone,
  bidding,
  bidwinners,
  memberid,
  data,
  className,
  getHouseMember,
  notificationLoad,
  ...rest
}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [bidamount, setAmount] = React.useState();
  const [err, setErr] = useState();
  let { id } = useParams();
  const check = () => {
    if (bidding === true && bidtaken === false) {
      getHouseMember(id);
      notificationLoad();
      console.log("On EVery 8");
    }
  };
  useEffect(() => {
    check();
    var interval = setInterval(check, 8000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    clearErrors();
    if (errmsg.length) {
      setErr(errmsg);
      setOpen(true);
    }
    if (newAdded === true && addingloading === false) {
      setErr("Bid Placed");
      setOpen(true);
    }
    // eslint-disable-next-line
  }, [addingloading]);
  const handleTextfiled = (e) => {
    let amount = e.target.value;

    setAmount(amount);
  };

  const handleClick = () => {
    getHouseMember(id);
    clearErrors();
    submitBid(bidamount, houseid);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleRefresh = () => {
    getHouseMember(id);
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={err}
      />
      <Card className={clsx(classes.root, className)} {...rest}>
        <Box>
          <Typography color="error" variant="h4" align="center">
            Bid Here
            <Typography
              color="error"
              variant="h4"
              align="right"
              style={{ display: "inline-block" }}
            >
              <IconButton onClick={handleRefresh}>
                <RefreshIcon />
              </IconButton>
            </Typography>
          </Typography>
        </Box>
        <Divider />
        <CardContent>
          {bidtaken === true ? (
            <Typography color="textSecondary" variant="h4">
              You Already Taken A Bid Amount.
            </Typography>
          ) : (
            <Box height={200} position="relative" ml={4} mr={4}>
              {bidding ? (
                <>
                  <Typography color="textSecondary" variant="subtitle1">
                    Current Bid Price :
                    <Typography
                      color="error"
                      variant="h4"
                      style={{ display: "inline-block" }}
                    >
                      ₹{Number(data.amount).toLocaleString("en-IN")}
                    </Typography>
                  </Typography>

                  <Typography color="textSecondary" variant="subtitle1">
                    Bid Placed By :
                    <Typography
                      color="error"
                      variant="h4"
                      style={{ display: "inline-block" }}
                    >
                      {member.toString() === data.memberid.toString()
                        ? "You"
                        : data.membername}
                    </Typography>
                  </Typography>
                  <TextField
                    id="outlined"
                    color="secondary"
                    label="Enter Bid Amount"
                    value={bidamount}
                    type="number"
                    onChange={handleTextfiled}
                    fullWidth
                  />
                  {member.toString() === data.memberid.toString() ? (
                    <Button
                      variant="contained"
                      fullWidth
                      color="secondary"
                      className={classes.btn}
                      disabled
                    >
                      Bid Placed By You
                    </Button>
                  ) : paymentdone === true ? (
                    <Button
                      variant="contained"
                      fullWidth
                      color="secondary"
                      className={classes.btn}
                      onClick={handleClick}
                    >
                      {addingloading ? (
                        <CircularProgress size="1.5rem" />
                      ) : (
                        "Place Your Bid"
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      fullWidth
                      color="secondary"
                      className={classes.btn}
                      disabled
                    >
                      Payment Not Done
                    </Button>
                  )}

                  <Typography color="textSecondary" variant="h6">
                    Bid Amount Should Be greater Than Current +
                    {Math.round(entryamount / 20)}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography color="textSecondary" variant="h4">
                    Biding At 12:00 PM to 04:00 PM
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    color="secondary"
                    className={classes.btn}
                    disabled
                  >
                    Stay Tuned
                  </Button>
                </>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </>
  );
};

SubmitBid.propTypes = {
  className: PropTypes.string,
  submitBid: PropTypes.func.isRequired,
  errmsg: PropTypes.string.isRequired,
  clearErrors: PropTypes.func.isRequired,
  addingloading: PropTypes.object.isRequired,
  newAdded: PropTypes.object.isRequired,
  getHouseMember: PropTypes.func.isRequired,
  notificationLoad: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  errmsg: state.error.msg,
  addingloading: state.houses.addingloading,
  newAdded: state.houses.newAdded,
});
export default connect(mapStateToProps, {
  submitBid,
  clearErrors,
  getHouseMember,
  notificationLoad,
})(SubmitBid);
