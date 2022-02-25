import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { Avatar, colors, Divider, Grid } from "@material-ui/core";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import CallMadeIcon from "@material-ui/icons/CallMade";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import ErrorIcon from "@material-ui/icons/Error";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
  card: {
    position: "absolute",
    top: "290px",
    [theme.breakpoints.up("sm")]: {
      bottom: "8px",
    },
    [theme.breakpoints.down("sm")]: {
      bottom: "54px",
      width: "98%",
    },
    // [theme.breakpoints.down("xs")]: {
    //   top: "290px",
    // },

    bottom: "50px",
    width: "50%",

    backgroundColor: theme.palette.background.blue,
    overflowY: "auto",
    overflowX: "hidden",
  },
  green: {
    backgroundColor: colors.green[500],
  },
  red: {
    backgroundColor: colors.red[500],
  },
  orange: {
    backgroundColor: colors.yellow[900],
  },
}));

function SimpleList({ transaction }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item className={classes.card} lg={7} sm={7} xl={7} xs={12}>
          <List component="nav" aria-label="main mailbox folders">
            {transaction
              .slice(0)
              .reverse()
              .map((data) => (
                <>
                  <ListItem button>
                    <ListItemIcon>
                      {data.transtype === "credit" ? (
                        <Avatar className={classes.green}>
                          <CallReceivedIcon />
                        </Avatar>
                      ) : data.transtype === "debit" ? (
                        <Avatar className={classes.red}>
                          <CallMadeIcon />
                        </Avatar>
                      ) : data.transtype === "failed" ? (
                        <Avatar className={classes.red}>
                          <ErrorIcon />
                        </Avatar>
                      ) : data.transtype === "declined" ? (
                        <Avatar className={classes.red}>
                          <ErrorIcon />
                        </Avatar>
                      ) : (
                        <Avatar className={classes.orange}>
                          <QueryBuilderIcon />
                        </Avatar>
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        data.transtype === "credit"
                          ? "Received"
                          : data.transtype === "debit"
                          ? "Debit"
                          : data.transtype === "failed"
                          ? "Failed"
                          : data.transtype === "declined"
                          ? "Declined"
                          : "Pending"
                      }
                      secondary={moment(data.transtime).format("lll")}
                    />
                    <ListItemText
                      primary={
                        "₹" + Number(data.amount).toLocaleString("en-IN")
                      }
                      style={{ textAlign: "right" }}
                    />
                  </ListItem>
                  <Divider />
                </>
              ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );
}

SimpleList.propTypes = {
  transaction: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  transaction: state.auth.member.wallettransaction,
});

export default connect(mapStateToProps)(SimpleList);
