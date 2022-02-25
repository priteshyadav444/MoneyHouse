import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "../../components/Page";
import Profile from "./Profile";
import ProfileDetails from "./ProfileDetails";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const ProfileView = ({ memberdata }) => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Profile - MoneyHouse">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Profile
              firstname={memberdata.firstname}
              lastname={memberdata.lastname}
            />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ProfileDetails data={memberdata} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

ProfileView.propTypes = {
  memberdata: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  memberdata: state.auth.member,
});
export default connect(mapStateToProps)(ProfileView);
