import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Register from "./Register";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, Snackbar } from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#fff",
  },
}));

function NewScheme({ props, newAdded, houses }) {
  const [open, setOpen] = React.useState(false);
  const [snackOpen, setSnack] = React.useState(false);

  const classes = useStyles();
  useEffect(() => {
    if (newAdded) {
      handleClose();
      setSnack(true);
    }
  }, [newAdded]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleBClose = () => {
    setSnack(false);
  };

  return (
    <div>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleBClose}
      >
        <Alert onClose={handleBClose} severity="success">
          New Scheme Added
        </Alert>
      </Snackbar>
      <Button className={classes.root} onClick={handleClickOpen}>
        <AddIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create New House</DialogTitle>
        <DialogContent>
          <Register />
        </DialogContent>
      </Dialog>
    </div>
  );
}
Register.propTypes = {
  houses: PropTypes.object.isRequired,
  newAdded: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  houses: state.houses,
  newAdded: state.houses.newAdded,
});
export default connect(mapStateToProps)(NewScheme);
