import React from "react";
import Portfolio from "./Portfolio";
import TransactionList from "./TransactionList";
import Page from "../../components/Page";
import { Container, Grid, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));
export default function WalletView() {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Wallet Transaction - MoneyHouse">
      <Container maxWidth={false}>
        <Grid container>
          <Grid item xs={12}>
            <Portfolio />
          </Grid>
          <Grid item xs={12}>
            <TransactionList />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
