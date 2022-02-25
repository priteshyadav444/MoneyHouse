import React from "react";
import {
  Box,
  Container,
  Typography,
  makeStyles,
  TextField,
} from "@material-ui/core";
import Page from "../../components/Page";
import { Rating } from "@material-ui/lab";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,

    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  margin: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  image: {
    marginTop: 50,
    display: "inline-block",
    maxWidth: "100%",
    width: 560,
  },
}));
export default function ThankYou() {
  const classes = useStyles();

  const handleClick = () => {
    window.location.href = "login";
  };
  return (
    <Page className={classes.root} title="Thank You - Moneyhouse.com">
      <Box
        display="flex"
        flexDirection="column"
        height="70%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography align="center" color="textPrimary" variant="h1">
            Thank You For Visiting MoneyHouse
          </Typography>

          <Typography align="center" className={classes.margin}>
            <Button variant="contained" color="primary" onClick={handleClick}>
              {" "}
              Go Back
            </Button>
            <Button variant="outlined" color="primary" onClick={handleClick}>
              Log In
            </Button>
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            Please Rate Use this take less than a minutes
          </Typography>
          <Box textAlign="left">
            <Box component="fieldset" mt={1} mb={1} borderColor="transparent">
              <Typography component="legend">Your Feedback</Typography>
              <Rating name="pristine" value={null} />
            </Box>
            <Box component="fieldset" mb={1} borderColor="transparent">
              <Typography>Any Suggestions</Typography>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={5}
                fullWidth
                placeholder="Your Feedback"
                variant="outlined"
                className={classes.root}
              />
              <Button variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Page>
  );
}
