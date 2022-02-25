import React, { useEffect } from "react";
import clsx from "clsx";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { payment } from "../../action/houseAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
  Button,
  CircularProgress,
  Box,
  Dialog,
  Snackbar,
} from "@material-ui/core";

import AttachMoneyTwoToneIcon from "@material-ui/icons/AttachMoneyTwoTone";
import Portfolio from "../Home/schemecomponent/Portfolio";
import { Alert } from "@material-ui/lab";
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

const Payment = ({
  paymentaccept,
  paymentstatus,
  paymentdone,
  creditbalance,
  fineamount,
  entryamount,
  className,
  walletbalance,
  payment,
  houseid,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [sopen, setSOpen] = React.useState(false);
  const [msg, setMsg] = React.useState(false);
  const [copen, setCOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (paymentstatus === true) {
      setMsg("Payment Done");
      setOpen(false);
      setSOpen(true);
      setCOpen(false);
    } else if (paymentstatus === false) {
      setMsg("Payment Failed");
      setOpen(false);
      setSOpen(true);
      setCOpen(false);
    }
  }, [paymentstatus]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseSnack = () => {
    setSOpen(false);
  };
  const handleJoin = () => {
    setCOpen(true);
    payment(houseid, entryamount + fineamount - creditbalance, walletbalance);
  };
  return (
    <>
      {paymentaccept === true ? (
        <>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={sopen}
            autoHideDuration={3000}
            onClose={handleCloseSnack}
          >
            <Alert onClose={handleCloseSnack} severity="success">
              {msg}
            </Alert>
          </Snackbar>
          <Card className={clsx(classes.root, className)} {...rest}>
            <CardContent>
              <Grid container justify="space-between" spacing={3}>
                <Grid item>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Payment Status
                  </Typography>
                  <Typography color="secondary" variant="h4">
                    {paymentdone === true ? "Paid" : "Not Paid"}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Pool Payment
                  </Typography>
                  <Typography color="textPrimary" variant="h4">
                    ₹{Number(entryamount).toLocaleString("en-IN")}
                  </Typography>
                </Grid>
                {fineamount > 0 ? (
                  <Grid item>
                    <Typography color="textSecondary" gutterBottom variant="h6">
                      Late Payment Charge
                    </Typography>
                    <Typography color="textPrimary" variant="h4">
                      +₹{Number(entryamount).toLocaleString("en-IN")}
                    </Typography>
                  </Grid>
                ) : null}
                {creditbalance > 0 ? (
                  <Grid item>
                    <Typography color="textSecondary" gutterBottom variant="h6">
                      Credit Balance
                    </Typography>
                    <Typography color="textPrimary" variant="h4">
                      -₹{Number(creditbalance).toLocaleString("en-IN")}
                    </Typography>
                  </Grid>
                ) : null}

                <Grid item>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Total Amount
                  </Typography>
                  <Typography color="textPrimary" variant="h4">
                    ₹
                    {Number(
                      entryamount + fineamount - creditbalance
                    ).toLocaleString("en-IN")}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="h6"
                  ></Typography>
                  {paymentdone === true ? (
                    <Button
                      size="large"
                      variant="outlined"
                      disabled
                      color="secondary"
                    >
                      <AttachMoneyTwoToneIcon />
                      Paid
                    </Button>
                  ) : (
                    <Button
                      size="large"
                      variant="outlined"
                      color="secondary"
                      onClick={handleClick}
                    >
                      <AttachMoneyTwoToneIcon />
                      Pay
                    </Button>
                  )}
                </Grid>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <div style={{ width: "100%" }}>
                    <Box display="flex" bgcolor="background.paper">
                      <Box flexGrow={1}>
                        <DialogTitle id="alert-dialog-title">
                          {"Payment "}
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
                  <DialogContent>
                    <Portfolio
                      entryamount={entryamount}
                      balance={walletbalance + fineamount}
                    />
                  </DialogContent>

                  <DialogActions>
                    <Button onClick={handleJoin} color="primary">
                      {copen ? <CircularProgress size={20} /> : "Pay"}
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </CardContent>
          </Card>
        </>
      ) : (
        ""
      )}
    </>
  );
};

Payment.propTypes = {
  payment: PropTypes.func.isRequired,
  paymentstatus: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  paymentstatus: state.houses.paymentstatus,
});

export default connect(mapStateToProps, { payment })(Payment);
