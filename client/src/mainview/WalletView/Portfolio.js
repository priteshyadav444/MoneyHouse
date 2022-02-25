import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddMoney from "./AddMoney";
import PropTypes from "prop-types";
import { Snackbar } from "@material-ui/core";
import AddPaymentMoney from "./AddPaymentMoney";
import { updateHouseJoined } from "../../action/houseAction";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import WorkOffIcon from "@material-ui/icons/WorkOff";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    marginTop: theme.spacing(1),
    width: "100%",
    paddingTop: theme.spacing(2),
  },
  card: { width: "100%", minHeight: "100%" },
  cardcontent: {
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.background.blue,
  },
  headContent: {
    width: "295px",
    height: "100px",
    padding: theme.spacing(0.5),
    margin: theme.spacing(2),
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  color: {
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(4),
  },
  right: {
    marginRight: theme.spacing(5),
  },
  left: {
    marginLeft: theme.spacing(5),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const Portfolio = ({
  walletbalance,
  transaction,
  withdrawnbalance,
  creditbalance,
  moneyadding,
  updateHouseJoined,
}) => {
  const classes = useStyles();
  const [addMoneyState, setOpenAddMoney] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openPayment, setOpenPayment] = React.useState(false);
  const [snackOpen, setSnack] = React.useState(false);
  const [withdrawnState, setWithdrawn] = React.useState(false);
  useEffect(() => {
    if (moneyadding === false) {
      setSnack(true);
      setOpen(false);
    }
  }, [moneyadding]);
  useEffect(() => {
    updateHouseJoined();
  }, [updateHouseJoined]);
  const handleClickOpen = () => {
    setOpenPayment(true);
  };

  const handleClickOpenPayment = () => {
    setOpen(true);
  };
  const handleAddMoney = () => {
    setOpenAddMoney(true);
  };
  const handleWithdrawn = () => {
    setWithdrawn(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenAddMoney(false);
    setOpenPayment(false);
    setWithdrawn(false);
  };
  const handleBClose = () => {
    setSnack(false);
  };

  return (
    <>
      <div className={classes.root} title="Portfolio">
        <Snackbar
          open={snackOpen}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          onClose={handleBClose}
        >
          <Alert onClose={handleBClose} severity="warning">
            Payment Requested
          </Alert>
        </Snackbar>
        <Container maxWidth={false}>
          <Grid container spacing={1} justify="center">
            <Grid item className={classes.card} lg={6} sm={6} xl={6} xs={12}>
              <Card>
                <CardContent className={classes.cardcontent}>
                  <div style={{ width: "100%", marginBottom: 20 }}>
                    <Box display="flex" justifyContent="center">
                      <Box display="flex">
                        <Typography
                          color="textPrimary"
                          display="inline"
                          variant="subtitle2"
                          align="right"
                        >
                          Total Wallet Balance
                          <Typography
                            color="textPrimary"
                            variant="h1"
                            display="block"
                            align="right"
                          >
                            ₹{Number(walletbalance).toLocaleString("en-IN")}
                          </Typography>
                        </Typography>
                      </Box>
                    </Box>
                  </div>
                  <div style={{ width: "100%" }}>
                    <Box display="flex" justifyContent="center">
                      <div className={classes.right}>
                        <Typography
                          color="textPrimary"
                          display="block"
                          variant="subtitle2"
                        >
                          Total Deposit
                          <Typography
                            color="textPrimary"
                            variant="h4"
                            display="block"
                            align="right"
                          >
                            ₹{Number(creditbalance).toLocaleString("en-IN")}
                          </Typography>
                        </Typography>
                      </div>
                      <Divider orientation="vertical" flexItem />
                      <div className={classes.left}>
                        <Typography
                          color="textPrimary"
                          display="inline-block"
                          variant="subtitle2"
                        >
                          Total WithDrawn
                          <Typography
                            color="textPrimary"
                            variant="h4"
                            display="block"
                            align="right"
                          >
                            ₹{Number(withdrawnbalance).toLocaleString("en-IN")}
                          </Typography>
                        </Typography>
                      </div>
                    </Box>
                  </div>
                </CardContent>
                <CardActions>
                  <div style={{ width: "100%" }}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      bgcolor="background.paper"
                    >
                      <Box>
                        <Button
                          size="small"
                          color="primary"
                          onClick={handleAddMoney}
                        >
                          ADD MONEY
                        </Button>
                      </Box>
                      <Box>
                        <Button
                          size="small"
                          color="primary"
                          onClick={handleWithdrawn}
                        >
                          Withdrawn
                        </Button>
                      </Box>
                    </Box>

                    <Dialog
                      open={addMoneyState}
                      onClose={handleClose}
                      aria-labelledby="form-dialog-title"
                    >
                      <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={handleClose}
                      >
                        <CloseIcon />
                      </IconButton>
                      <DialogTitle id="form-dialog-title">
                        Add Money
                      </DialogTitle>
                      <DialogContent className={classes.headContent}>
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          onClick={handleClickOpen}
                        >
                          PAY ONLINE
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          onClick={handleClickOpenPayment}
                        >
                          REQUEST ADMIN
                        </Button>
                        <div />
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      open={withdrawnState}
                      onClose={handleClose}
                      aria-labelledby="form-dialog-title"
                    >
                      <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={handleClose}
                      >
                        <CloseIcon />
                      </IconButton>
                      <DialogTitle id="form-dialog-title">
                        Withdrawn Money
                      </DialogTitle>
                      <DialogContent className={classes.headContent}>
                        <Typography display="inline" variant="h4">
                          Under Construction <WorkOffIcon />
                        </Typography>
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="form-dialog-title"
                    >
                      <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={handleClose}
                      >
                        <CloseIcon />
                      </IconButton>
                      <DialogTitle id="form-dialog-title">
                        Request Add Money
                      </DialogTitle>
                      <DialogContent>
                        <AddMoney handleClose={handleClose} />
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      open={openPayment}
                      onClose={handleClose}
                      aria-labelledby="form-dialog-title"
                    >
                      <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={handleClose}
                      >
                        <CloseIcon />
                      </IconButton>
                      <DialogTitle id="form-dialog-title">
                        Add Money Online
                      </DialogTitle>
                      <DialogContent>
                        <AddPaymentMoney handleClose={handleClose} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

Portfolio.propTypes = {
  walletbalance: PropTypes.object.isRequired,
  updateHouseJoined: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  walletbalance: state.auth.member.walletbalance,
  creditbalance: state.auth.member.creditbalance,
  withdrawnbalance: state.auth.member.withdrawnbalance,
  moneyadding: state.auth.moneyadding,
  transaction: state.auth.member.wallettransaction,
});

export default connect(mapStateToProps, { updateHouseJoined })(Portfolio);
