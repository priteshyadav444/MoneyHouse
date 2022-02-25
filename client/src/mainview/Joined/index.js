import React from "react";
import Portfolio from "./Portfolio";
import TabSliderJoined from "./TabSliderJoined";
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
export default function Portfolie() {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Portfolio - MoneyHouse">
      <Container maxWidth={false}>
        <Grid container spacing={1.5}>
          <Grid item xs={12}>
            <Portfolio />
          </Grid>
          <Grid item xs={12}>
            <TabSliderJoined />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
