import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Portfolio from "./Portfolio";
function WalletDailog({ walletbalance }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AccountBalanceWalletIcon onClick={handleClickOpen} />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Wallet"}</DialogTitle>
        <DialogContent>
          <Portfolio balance={walletbalance} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

WalletDailog.propTypes = {
  walletbalance: PropTypes.object.isRequired,
  className: PropTypes.string,
};
const mapStateToProps = (state) => ({
  walletbalance: state.auth.member.walletbalance,
});
export default connect(mapStateToProps)(WalletDailog);
