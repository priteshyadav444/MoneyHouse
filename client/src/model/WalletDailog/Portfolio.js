import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    marginTop: theme.spacing(1),
    width: "500",
  },
  card: {
    width: "350px",
    [theme.breakpoints.down("xs")]: {
      width: "260px",
    },
  },
  cardcontent: {
    padding: theme.spacing(1.5),
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

const Portfolio = ({ balance }) => {
  const classes = useStyles();
  let history = useHistory();
  const handleClick = () => {
    history.push(`/account/wallet`);
  };
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
                        ₹{Number(balance).toLocaleString("en-IN")}
                      </Typography>
                    </Typography>
                  </Box>
                </Grid>
              </CardContent>
              <CardActions>
                <div style={{ width: "100%" }}>
                  <Box
                    display="flex"
                    justifyContent="space-around"
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
        </Grid>
      </Container>
    </>
  );
};

export default Portfolio;
