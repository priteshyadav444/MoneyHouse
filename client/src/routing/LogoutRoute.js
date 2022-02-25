import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../action/authMemberAction";
import store from "../store";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { Backdrop, makeStyles } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";

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

const LogoutRoute = ({ isAdminAutenticated, isMemberAutenticated }) => {
  const classes = useStyles();

  let history = useHistory();
  useEffect(() => {
    store.dispatch(logout());
  }, []);
  useEffect(() => {
    if (isMemberAutenticated === false) {
      history.push("/rate-us");
    }

    // eslint-disable-next-line
  }, [isMemberAutenticated]);
  return (
    <>
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
        Logout
      </Backdrop>
    </>
  );
};

LogoutRoute.propTypes = {
  isAdminAutenticated: PropTypes.bool.isRequired,
  isMemberAutenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isAdminAutenticated: state.authAdmin.isAdminAutenticated,
  isMemberAutenticated: state.auth.isMemberAutenticated,
});
export default connect(mapStateToProps)(LogoutRoute);
