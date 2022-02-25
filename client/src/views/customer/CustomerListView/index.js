import React, { useEffect, useState } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Page from "../../../components/Page";
import Results from "./Results";
import Toolbar from "./Toolbar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadAllMemberData } from "../../../action/authAdminAction";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  circularroot: {
    textAlign: "center",
  },
}));

const CustomerListView = ({ members, loadAllMemberData, isAdminLoading }) => {
  const classes = useStyles();
  const [membersdata, setMembers] = useState([]);

  useEffect(() => {
    loadAllMemberData();
  }, [loadAllMemberData]);
  useEffect(() => {
    setMembers(members);
  }, [members]);
  return (
    <Page className={classes.root} title="Members">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={1.5}>
          {isAdminLoading === true ? (
            <div className={classes.circularroot}>
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <Results customers={membersdata} />
          )}
        </Box>
      </Container>
    </Page>
  );
};

CustomerListView.propTypes = {
  loadAllMemberData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  members: state.authAdmin.members,
  isAdminLoading: state.authAdmin.isAdminLoading,
});

export default connect(mapStateToProps, { loadAllMemberData })(
  CustomerListView
);
