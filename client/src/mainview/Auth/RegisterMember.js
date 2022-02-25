import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import GoogleIcon from "../../icons/Google";
import GoogleLogin from "react-google-login";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import Page from "../../components/Page";

import { clearErrors } from "../../action/errorAction";
import { memberRegister } from "../../action/authMemberAction";
import { Grid } from "@material-ui/core";
import { Backdrop } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3.5),
  },
  google: {
    backgroundColor: "#fff",
    borderRadius: theme.spacing(3),
  },
  btn: {
    borderRadius: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "black",
  },
}));

const RegisterMember = ({
  memberRegister,
  errormsg,
  clearErrors,
  isMemberLoading,
  isMemberAutenticated,
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
      setErr("Registerd  Succesfully");
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
      firstname: res.profileObj.givenName,
      lastname: res.profileObj.familyName,
      imgurl: res.profileObj.imageUrl,
    };
    memberRegister(data);
  };
  const responseFailGoogle = (err) => {
    console.log(err);
  };
  return (
    <>
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
      <Backdrop className={classes.backdrop} open={isMemberLoading}>
        <CircularProgress color="primary" />
      </Backdrop>
      <Page className={classes.root} title="Register - MoneyHouse">
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
                firstname: "",
                lastname: "",
                password: "",
                email: "",
                imgurl: "null",
                policy: false,
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("Must be a valid email")
                  .max(255)
                  .required("Email is required"),
                firstname: Yup.string()
                  .max(255)
                  .required("First name is required"),
                lastname: Yup.string()
                  .max(255)
                  .required("Last name is required"),
                password: Yup.string()
                  .min(8)
                  .max(255)
                  .required("Password is required"),
                policy: Yup.boolean().oneOf(
                  [true],
                  "This field must be checked"
                ),
              })}
              onSubmit={(initialValues, formikApi) => {
                clearErrors();

                memberRegister(initialValues);
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
                        Signup
                      </Typography>
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
                              Sign Up With Google
                            </Button>
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <TextField
                    error={Boolean(touched.firstname && errors.firstname)}
                    fullWidth
                    helperText={touched.firstname && errors.firstname}
                    label="First name"
                    margin="normal"
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstname}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.lastname && errors.lastname)}
                    fullWidth
                    helperText={touched.lastname && errors.lastname}
                    label="Last name"
                    margin="normal"
                    name="lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastname}
                    variant="outlined"
                  />
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
                  <Box alignItems="center" display="flex" ml={-1}>
                    <Checkbox
                      checked={values.policy}
                      name="policy"
                      onChange={handleChange}
                    />
                    <Typography color="textSecondary" variant="body1">
                      I have read the
                      <Link
                        color="primary"
                        component={RouterLink}
                        to="#"
                        underline="always"
                        variant="h6"
                      >
                        Terms and Conditions
                      </Link>
                    </Typography>
                  </Box>
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
                      className={classes.btn}
                    >
                      {isMemberLoading ? (
                        <CircularProgress size="1.5rem" />
                      ) : (
                        "Sign up now"
                      )}
                    </Button>
                  </Box>
                  <Typography color="textSecondary" variant="body1">
                    Already Have an account ?{" "}
                    <Link component={RouterLink} to="/login" variant="h6">
                      Log In Here
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
RegisterMember.propTypes = {
  memberRegister: PropTypes.func.isRequired,
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
export default connect(mapStateToProps, { memberRegister, clearErrors })(
  RegisterMember
);
