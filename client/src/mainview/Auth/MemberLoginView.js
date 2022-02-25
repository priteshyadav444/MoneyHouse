import GoogleIcon from "../../icons/Google";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles,
  CircularProgress,
  Snackbar,
  Grid,
} from "@material-ui/core";
import Page from "../../components/Page";
import { memberLogin } from "../../action/authMemberAction";
import { clearErrors } from "../../action/errorAction";
import { Backdrop } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(1),
  },
  google: {
    backgroundColor: "#fff",
    borderRadius: theme.spacing(3),
  },
  curve: {
    borderRadius: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "black",
  },
}));

const MemberLoginView = ({
  memberLogin,
  isMemberAutenticated,
  errormsg,
  clearErrors,
  isMemberLoading,
}) => {
  let history = useHistory();
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState("");

  const handleClose = (event, reason) => {
    setOpen(false);
  };
  const classes = useStyles();
  useEffect(() => {
    clearErrors();
    if (isMemberAutenticated === false) {
      setErr(errormsg);
      if (errormsg) {
        setOpen(true);
      }
    } else if (isMemberAutenticated === true) {
      setErr("Logged Succesfully");
      setOpen(true);
      setTimeout(function () {
        history.push("/home");
      }, 500);
    }
    // eslint-disable-next-line
  }, [isMemberAutenticated]);

  const responseSuccessGoogle = (res) => {
    const data = {
      email: res.profileObj.email,
      password: res.profileObj.googleId,
    };
    memberLogin(data);
  };
  const responseFailGoogle = (err) => {
    console.log(err);
  };
  return (
    <>
      <Backdrop className={classes.backdrop} open={isMemberLoading}>
        <CircularProgress color="primary" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={err}
      />
      <Page className={classes.root} title="Log In - MoneyHouse">
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          <Container maxWidth="sm">
            <Formik
              enableReinitialize={true}
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("Must be a valid email")
                  .max(255)
                  .required("Email is required"),

                password: Yup.string()
                  .min(8)
                  .max(255)
                  .required("password is required"),
              })}
              onSubmit={(initialValues, formikApi) => {
                clearErrors();
                memberLogin(initialValues);
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box mb={3}>
                    <Box mb={3}>
                      <Typography color="info" variant="h2" align="center">
                        Login
                      </Typography>
                    </Box>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <GoogleLogin
                        clientId="204607928924-6ptr9pueo4m2tortdoljls1ti2vov8b3.apps.googleusercontent.com"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseFailGoogle}
                        cookiePolicy={"single_host_origin"}
                        render={(renderProps) => (
                          <Button
                            fullWidth
                            startIcon={<GoogleIcon />}
                            size="large"
                            variant="contained"
                            onClick={renderProps.onClick}
                            className={classes.google}
                          >
                            Login With Google
                          </Button>
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Box mt={3} mb={1}>
                    <Typography
                      align="center"
                      color="textSecondary"
                      variant="body1"
                    >
                      or login with email address
                    </Typography>
                  </Box>

                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />

                  {Boolean(touched.policy && errors.policy) && (
                    <FormHelperText error>{errors.policy}</FormHelperText>
                  )}
                  <Box my={2}>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      disabled={isMemberLoading}
                      variant="contained"
                      className={classes.curve}
                    >
                      {isMemberLoading ? (
                        <CircularProgress size="1.5rem" />
                      ) : (
                        "Log In"
                      )}
                    </Button>
                  </Box>
                  <Typography color="textSecondary" variant="body1">
                    Create an account ?{" "}
                    <Link component={RouterLink} to="/register" variant="h6">
                      Sign up Here
                    </Link>
                  </Typography>
                </form>
              )}
            </Formik>
          </Container>
        </Box>
      </Page>
    </>
  );
};
MemberLoginView.propTypes = {
  memberLogin: PropTypes.func.isRequired,
  isMemberAutenticated: PropTypes.bool.isRequired,
  errormsg: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  isMemberLoading: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isMemberAutenticated: state.auth.isMemberAutenticated,
  errormsg: state.error.msg,
  isMemberLoading: state.auth.isMemberLoading,
});
export default connect(mapStateToProps, { memberLogin, clearErrors })(
  MemberLoginView
);
