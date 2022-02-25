import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Hidden,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { useHistory } from "react-router";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    marginTop: theme.spacing(2),
    width: "100%",
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  card: { width: "100%", minHeight: "100%" },
  cardcontent: {
    padding: theme.spacing(1.5),
    paddingBottom: theme.spacing(0),
    backgroundColor: theme.palette.background.blue,
  },
  color: {
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(4),
  },
  right: {
    marginRight: theme.spacing(4),
  },
  left: {
    marginLeft: theme.spacing(4),
  },
}));

const Portfolio = ({ walletbalance, creditbalance, withdrawnbalance }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = () => {
    history.push(`/wallet`);
  };
  return (
    <>
      <div className={classes.root}>
        <Container maxWidth={false}>
          <Grid container spacing={1} flex>
            <Grid item className={classes.card} lg={6} sm={6} xl={6} xs={12}>
              <Card>
                <CardContent className={classes.cardcontent}>
                  <Grid item>
                    <Box display="flex">
                      <Typography color="textSecondary" variant="h6">
                        <Avatar className={classes.color}>
                          <AccountBalanceWalletIcon />
                        </Avatar>
                      </Typography>
                      <Typography
                        color="textPrimary"
                        display="inline"
                        variant="subtitle2"
                        align="right"
                      >
                        Total Wallet Balance
                        <Typography
                          color="textPrimary"
                          variant="h4"
                          display="block"
                        >
                          ₹{Number(walletbalance).toLocaleString("en-IN")}
                        </Typography>
                      </Typography>
                    </Box>
                  </Grid>
                </CardContent>
                <CardActions>
                  <div style={{ width: "100%" }}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      bgcolor="background.paper"
                    >
                      <Box>
                        <Button
                          size="small"
                          color="primary"
                          onClick={handleClick}
                        >
                          DEPOSIT AMOUNT
                        </Button>
                      </Box>
                    </Box>
                  </div>
                </CardActions>
              </Card>
            </Grid>
            <Hidden xsDown>
              <Grid item className={classes.card} lg={6} sm={6} xl={6} xs={12}>
                <Card>
                  <CardContent className={classes.cardcontent}>
                    <div style={{ width: "100%" }}>
                      <Box display="flex" justifyContent="center">
                        <div
                          style={{ width: "100%" }}
                          className={classes.right}
                        >
                          <Typography color="textPrimary" variant="subtitle2">
                            Total Deposit
                            <Typography
                              color="textPrimary"
                              variant="h4"
                              display="block"
                            >
                              ₹{Number(creditbalance).toLocaleString("en-IN")}
                            </Typography>
                          </Typography>
                        </div>
                        <Divider orientation="vertical" flexItem />
                        <div style={{ width: "100%" }} className={classes.left}>
                          <Typography
                            color="textPrimary"
                            display="inline-block"
                            variant="subtitle2"
                          >
                            Total Withdrawn
                            <Typography
                              color="textPrimary"
                              variant="h4"
                              display="block"
                              align="right"
                            >
                              ₹
                              {Number(withdrawnbalance).toLocaleString("en-IN")}
                            </Typography>
                          </Typography>
                        </div>
                      </Box>
                    </div>
                  </CardContent>
                  <CardActions>
                    <div style={{ width: "100%" }}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        bgcolor="background.paper"
                      >
                        <Box>
                          <Button
                            size="small"
                            color="primary"
                            onClick={handleClick}
                          >
                            View Transaction
                          </Button>
                        </Box>
                      </Box>
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            </Hidden>
          </Grid>
        </Container>
      </div>
    </>
  );
};

Portfolio.propTypes = {
  walletbalance: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  walletbalance: state.auth.member.walletbalance,
  creditbalance: state.auth.member.creditbalance,
  withdrawnbalance: state.auth.member.withdrawnbalance,
});

export default connect(mapStateToProps)(Portfolio);
