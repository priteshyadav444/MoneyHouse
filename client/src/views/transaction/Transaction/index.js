import React, { useEffect, useState } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Page from "../../../components/Page";
import Results from "./Results";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  loadTransaction,
  paymentApprove,
} from "../../../action/authAdminAction";
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
    verticalAlign: "center",
  },
}));

const Transaction = ({
  transaction,
  loadTransaction,
  isAdminLoading,
  paymentApprove,
}) => {
  const classes = useStyles();
  const [transactionData, setTransaction] = useState([]);

  useEffect(() => {
    loadTransaction();
  }, [loadTransaction]);
  useEffect(() => {
    setTransaction(transaction);
  }, [transaction]);
  return (
    <Page className={classes.root} title="Transaction">
      <Container maxWidth={false}>
        <Box mt={1.5}>
          {isAdminLoading === true ? (
            <div className={classes.circularroot}>
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <Results
              transaction={transactionData}
              key="1"
              paymentApprove={paymentApprove}
            />
          )}
        </Box>
      </Container>
    </Page>
  );
};

Transaction.propTypes = {
  loadTransaction: PropTypes.func.isRequired,
  paymentApprove: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  transaction: state.authAdmin.transaction,
  isAdminLoading: state.authAdmin.isAdminLoading,
});

export default connect(mapStateToProps, { loadTransaction, paymentApprove })(
  Transaction
);
