import { connect } from "react-redux";
import PropTypes from "prop-types";
import CheckingMain from "./CheckingMain";
import { loadMember } from "../action/authMemberAction";
import store from "../store";
import { useEffect } from "react";

const ProtectedMainRoute = ({ Component, isMemberAutenticated, path }) => {
  useEffect(() => {
    if (!isMemberAutenticated) {
      store.dispatch(loadMember());
    }
    // eslint-disable-next-line
  }, []);
  return isMemberAutenticated === true ? Component : <CheckingMain path />;
};
ProtectedMainRoute.propTypes = {
  isMemberAutenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isMemberAutenticated: state.auth.isMemberAutenticated,
});

export default connect(mapStateToProps)(ProtectedMainRoute);
