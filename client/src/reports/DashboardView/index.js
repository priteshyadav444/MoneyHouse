import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";

import Budget from "./Budget";
import LatestOrders from "./LatestOrders";
import LatestProducts from "./LatestProducts";
import Sales from "./Sales";
import TasksProgress from "./TasksProgress";
import TotalCustomers from "./TotalCustomers";
import TotalProfit from "./TotalProfit";
import SubmitBid from "./SubmitBid";
import Payment from "./Payment";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={1}>
          <Grid item lg={3} sm={6} xl={4} xs={12}>
            <Budget />
          </Grid>
          <Grid item lg={3} sm={6} xl={4} xs={12}>
            <TotalProfit />
          </Grid>
          <Grid item lg={3} sm={6} xl={4} xs={12}>
            <TotalCustomers />
          </Grid>

          <Grid item lg={3} sm={6} xl={4} xs={12}>
            <TasksProgress />
          </Grid>

          <Grid item lg={9} md={9} xl={9} xs={12}>
            <Sales />
          </Grid>

          <Grid item lg={3} md={3} xl={3} xs={12}>
            <SubmitBid />
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Payment />
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
