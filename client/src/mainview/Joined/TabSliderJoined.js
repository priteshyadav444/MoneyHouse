import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { connect } from "react-redux";
import SchemeJoined from "./schemecomponent/SchemeJoined";
import { Paper } from "@material-ui/core";
import SchemeHeader from "./schemecomponent/SchemeHeader";
import { updateHouseJoined } from "../../action/houseAction";
import { notificationLoad } from "../../action/authMemberAction";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1),
  },
  pap: {
    position: "absolute",
    top: "290px",
    [theme.breakpoints.up("sm")]: {
      bottom: "8px",
    },
    [theme.breakpoints.down("sm")]: {
      bottom: "54px",
    },
    bottom: "50px",
    width: "80%",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },

    backgroundColor: theme.palette.background.dark,
    overflowY: "auto",
    overflowX: "hidden",
  },
  panel: {
    backgroundColor: theme.palette.background.dark,
  },
}));

function TabSliderJoined({
  updateHouseJoined,
  housesdata,
  houseLoading,
  notificationLoad,
}) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    updateHouseJoined();
    notificationLoad();
  }, [updateHouseJoined, notificationLoad]);
  return (
    <div className={classes.root}>
      <AppBar position="static" color="intial">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
        >
          <Tab aria-label="shoping" label="Joined" {...a11yProps(0)} />
          <Tab aria-label="favorite" label="Completed" {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TabPanel className={classes.panel} value={value} index={0}>
        <SchemeHeader />
        <Paper className={classes.pap}>
          {!houseLoading
            ? housesdata.map((data) =>
                data.noofmember !== data.noofroundcompleted ? (
                  <SchemeJoined data={data} />
                ) : (
                  ""
                )
              )
            : ""}
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SchemeHeader />
        <Paper className={classes.pap}>
          {!houseLoading
            ? housesdata.map((data) =>
                data.noofmember === data.noofroundcompleted ? (
                  <SchemeJoined data={data} />
                ) : (
                  ""
                )
              )
            : ""}
        </Paper>
      </TabPanel>
    </div>
  );
}
TabSliderJoined.propTypes = {
  houseLoading: PropTypes.object.isRequired,
  updateHouseJoined: PropTypes.func.isRequired,
  notificationLoad: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  housesdata: state.auth.member.housesjoined,
  houseLoading: state.houses.loading,
});

export default connect(mapStateToProps, {
  updateHouseJoined,
  notificationLoad,
})(TabSliderJoined);
