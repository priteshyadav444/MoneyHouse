import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "../../components/Page";

import BankDetails from "./BankDetails";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const BankAccount = ({ memberdata }) => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Profile - MoneyHouse">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <BankDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

BankAccount.propTypes = {
  memberdata: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  memberdata: state.auth.member,
});
export default connect(mapStateToProps)(BankAccount);
