import { connect } from "react-redux";
import PropTypes from "prop-types";
import Checking from "./Checking";
import { loadAdmin } from "../action/authAdminAction";
import store from "../store";
import { useEffect } from "react";
const ProtectedRoute = ({ Component, isAdminAutenticated, path }) => {
  useEffect(() => {
    if (!isAdminAutenticated) {
      store.dispatch(loadAdmin());
    }
    // eslint-disable-next-line
  }, []);
  return isAdminAutenticated === true ? Component : <Checking path />;
};

ProtectedRoute.propTypes = {
  isAdminAutenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isAdminAutenticated: state.authAdmin.isAdminAutenticated,
});
export default connect(mapStateToProps)(ProtectedRoute);
