import React from "react";
import Options from "./Options";
import Page from "../../components/Page";
import { Container, Grid, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
}));
export default function Account() {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Account - MoneyHouse">
      <Container maxWidth="lg">
        <Grid container>
          <Grid item md={6} xs={12}>
            <Options />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
