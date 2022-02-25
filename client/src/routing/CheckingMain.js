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
const CheckingMain = ({
  admin,
  adminLogin,
  isMemberAutenticated,
  errormsg,
  clearErrors,
  isAdminLoading,
  path,
}) => {
  const classes = useStyles();
  let history = useHistory();

  useEffect(() => {
    if (isMemberAutenticated === false) {
      setTimeout(function () {
        history.push("/login");
      }, 500);
    } else if (isMemberAutenticated === true) {
      setTimeout(function () {
        history.push("/home");
      }, 500);
    }
    // eslint-disable-next-line
  }, [isMemberAutenticated]);

  return (
    <>
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

CheckingMain.propTypes = {
  isMemberAutenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isMemberAutenticated: state.auth.isMemberAutenticated,
  isMemberLoading: state.auth.isMemberLoading,
});
export default connect(mapStateToProps)(CheckingMain);
