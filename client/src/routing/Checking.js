import React, { useEffect } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { makeStyles, CircularProgress } from "@material-ui/core";
import { Backdrop } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(1),
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
const Checking = ({ isAdminAutenticated }) => {
  const classes = useStyles();
  let history = useHistory();

  useEffect(() => {
    if (isAdminAutenticated === false) {
      history.push("/dashboard/login");
    } else if (isAdminAutenticated === true) {
      history.push("/dashboard");
    }
    // eslint-disable-next-line
  }, [isAdminAutenticated]);

  return (
    <>
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
Checking.propTypes = {
  isAdminAutenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isAdminAutenticated: state.authAdmin.isAdminAutenticated,
});
export default connect(mapStateToProps)(Checking);
