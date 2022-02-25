import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import SchemeCardSkeleton from "./schemecomponent/SchemeCardSkeleton";
import SchemeCard from "./schemecomponent/SchemeCard";
import { getHouse, updateHouseJoined } from "../../action/houseAction";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { clearErrors } from "../../action/errorAction";
import { notificationLoad } from "../../action/authMemberAction";
import { Box, Container } from "@material-ui/core";
import Page from "../../components/Page";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
  },

  productCard: {
    position: "absolute",
    top: "72px",
    [theme.breakpoints.up("sm")]: {
      bottom: "8px",
    },
    [theme.breakpoints.down("sm")]: {
      bottom: "54px",
    },

    bottom: "50px",
    width: "78%",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },

    backgroundColor: theme.palette.background.dark,
    overflowY: "auto",
    overflowX: "hidden",
  },
}));
// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`scrollable-prevent-tabpanel-${index}`}
//       aria-labelledby={`scrollable-prevent-tab-${index}`}
//       {...other}
//     >
//       {value === index && <div>{children}</div>}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `scrollable-prevent-tab-${index}`,
//     "aria-controls": `scrollable-prevent-tabpanel-${index}`,
//   };
// }

function TabSlider({
  clearErrors,
  getHouse,
  housesdata,
  houseLoading,
  memberid,
  notificationLoad,
  updateHouseJoined,
}) {
  const classes = useStyles();
  // const [value, setValue] = React.useState(0);
  const [products, setProduct] = useState([]);

  useEffect(() => {
    getHouse(false);
    notificationLoad();
    updateHouseJoined();
    clearErrors();

    // eslint-disable-next-line
  }, [updateHouseJoined, getHouse, clearErrors]);
  useEffect(() => {
    setProduct(housesdata);
  }, [housesdata, clearErrors]);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  function skel() {
    return (
      <>
        <SchemeCardSkeleton />
        <SchemeCardSkeleton />
        <SchemeCardSkeleton />
        <SchemeCardSkeleton />
        <SchemeCardSkeleton />
        <SchemeCardSkeleton />
        <SchemeCardSkeleton />
        <SchemeCardSkeleton />
      </>
    );
  }
  return (
    <Page className={classes.root} title="Live - MoneyHouse">
      <Container maxWidth={false} className={classes.productCard}>
        <Box mt={1}>
          {!houseLoading
            ? products.map((data) => (
                <Grid item key={data.id} xs={12}>
                  <SchemeCard data={data} memberid={memberid} />
                </Grid>
              ))
            : skel()}

          {/* <AppBar position="fixed" color="intial">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              scrollButtons="off"
              indicatorColor="secondary"
              textColor="secondary"
              aria-label="scrollable prevent tabs example"
            >
              <Tab label="Daily" aria-label="Daily" {...a11yProps(0)} />
              <Tab label="Monthly" aria-label="Monthly" {...a11yProps(1)} />
              <Tab label="Weekly" aria-label="Weekly" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0} className={classes.tab}></TabPanel>
          <TabPanel value={value} index={1}></TabPanel>
          <TabPanel value={value} index={2}></TabPanel> */}
        </Box>
      </Container>
    </Page>
  );
}

TabSlider.propTypes = {
  getHouse: PropTypes.func.isRequired,
  updateHouseJoined: PropTypes.func.isRequired,
  memberid: PropTypes.object.isRequired,
  housesdata: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  notificationLoad: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  housesdata: state.houses.houses,
  houseLoading: state.houses.loading,
});

export default connect(mapStateToProps, {
  clearErrors,
  getHouse,
  notificationLoad,
  updateHouseJoined,
})(TabSlider);
