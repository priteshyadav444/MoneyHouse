import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    marginTop: theme.spacing(1),
  },
  card: {
    width: "350px",
    [theme.breakpoints.down("xs")]: {
      width: "260px",
    },
  },
  cardcontent: {
    flexGrow: 1,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.blue,
  },
  color: {
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(4),
  },
  right: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

const Portfolio = (props) => {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.card}>
        <Grid container flex>
          <Grid item className={classes.card}>
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
                        ₹{Number(props.balance).toLocaleString("en-IN")}
                      </Typography>
                    </Typography>
                  </Box>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Portfolio;
