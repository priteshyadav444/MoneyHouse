import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import Budget from "./Budget";
import LatestOrders from "./LatestOrders";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sales from "./Sales";
import TasksProgress from "./TasksProgress";
import TotalCustomers from "./TotalCustomers";
import TotalProfit from "./TotalProfit";
import SubmitBid from "./SubmitBid";
import Payment from "./Payment";
import { useParams } from "react-router";
import { getHouse, getHouseMember } from "../../action/houseAction";
import { Backdrop } from "@material-ui/core";
import Page from "../../components/Page";
import { notificationLoad } from "../../action/authMemberAction";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const SchemeDashboard = ({
  memberid,
  memberhousedata,
  loading,
  getHouseMember,
  walletbalance,
  notificationLoad,
}) => {
  let { id } = useParams();
  const classes = useStyles();
  const [housedata, setHouse] = useState(null);
  const [housememberdata, setMemberHouse] = useState();

  useEffect(() => {
    getHouseMember(id);
    notificationLoad();
  }, [getHouseMember, id, notificationLoad]);
  useEffect(() => {
    if (memberhousedata) {
      setHouse(memberhousedata.result);
      setMemberHouse(memberhousedata.memberhouse);
    }
  }, [memberhousedata]);

  return (
    <Page title="Bidding Live - MoneyHouse">
      <div className={classes.root} title="Dashboard">
        {housedata == null ? (
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <Container maxWidth={false}>
            <Grid container spacing={2}>
              <Grid item lg={3} sm={6} xl={4} xs={12}>
                <Budget poolamount={housedata.poolamount} />
              </Grid>
              <Grid item lg={3} sm={6} xl={4} xs={12}>
                <TotalProfit
                  profitloss={housememberdata.profitloss}
                  poolamount={housedata.poolamount}
                />
              </Grid>
              <Grid item lg={3} sm={6} xl={4} xs={12}>
                <TotalCustomers
                  noofroundcompleted={housedata.noofroundcompleted}
                  members={housedata.members}
                />
              </Grid>

              <Grid item lg={3} sm={6} xl={4} xs={12}>
                <TasksProgress />
              </Grid>

              <Grid item lg={9} md={9} xl={9} xs={12}>
                <Sales data={housedata.bidwinners} />
              </Grid>

              <Grid item lg={3} md={3} xl={3} xs={12}>
                <SubmitBid
                  bidwinners={housedata.bidwinners}
                  bidding={housedata.bidding}
                  data={housedata.lastbidder}
                  member={memberid}
                  entryamount={housedata.entryamount}
                  houseid={housedata._id}
                  bidtaken={housememberdata.bidtaken}
                  paymentdone={housememberdata.paymentdone}
                />
              </Grid>
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <Payment
                  paymentaccept={housedata.paymentaccept}
                  paymentdone={housememberdata.paymentdone}
                  creditbalance={housememberdata.creditbalance}
                  entryamount={housedata.entryamount}
                  fineamount={housememberdata.fineamount}
                  walletbalance={walletbalance}
                  houseid={housedata._id}
                />
              </Grid>
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <LatestOrders data={housedata.bidwinners} />
              </Grid>
            </Grid>
          </Container>
        )}
      </div>
    </Page>
  );
};
SchemeDashboard.propTypes = {
  memberhousedata: PropTypes.object.isRequired,
  memberid: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
  getHouseMember: PropTypes.func.isRequired,
  notificationLoad: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    memberhousedata: state.houses.joinedhousedata,
    memberid: state.auth.member._id,
    loading: state.houses.loading,
    walletbalance: state.auth.member.walletbalance,
  };
};

export default connect(mapStateToProps, {
  getHouse,
  getHouseMember,
  notificationLoad,
})(SchemeDashboard);
