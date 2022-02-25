import React from "react";
import TabSlider from "./TabSlider";
import Page from "../../components/Page";
import { Container, Grid, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Home - MoneyHouse">
      <Container maxWidth={false}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TabSlider />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
