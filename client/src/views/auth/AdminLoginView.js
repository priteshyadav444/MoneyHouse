import FacebookIcon from "../../icons/Facebook";
import GoogleIcon from "../../icons/Google";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

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
import { adminLogin } from "../../action/authAdminAction";
import { clearErrors } from "../../action/errorAction";
import { Backdrop } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(1),
  },
  curve: {
    borderRadius: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "black",
  },
}));

const AdminLoginView = ({
  admin,
  adminLogin,
  isAdminAutenticated,
  errormsg,
  clearErrors,
  isAdminLoading,
}) => {
  let history = useHistory();
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState("");

  const handleClose = (event, reason) => {
    setOpen(false);
  };
  const classes = useStyles();
  useEffect(() => {
    if (isAdminAutenticated === false) {
      setErr(errormsg);
      if (errormsg) {
        setOpen(true);
      }
    } else if (isAdminAutenticated === true) {
      setErr("Logged In Succesfully");
      setOpen(true);
      setTimeout(function () {
        history.push("/dashboard");
      }, 1000);
    }
    // eslint-disable-next-line
  }, isAdminAutenticated);

  return (
    <>
      <Backdrop className={classes.backdrop} open={isAdminLoading}>
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
      <Page className={classes.root} title="Admin - MoneyHouse">
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
                email: "priteshyadav444@gmail.com",
                password: "",
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("Must be a valid email")
                  .max(255)
                  .required("Email is required"),

                password: Yup.string()
                  .max(255)
                  .required("password is required"),
              })}
              onSubmit={(initialValues, formikApi) => {
                clearErrors();
                formikApi.resetForm({ initialValues: { ...initialValues } });
                adminLogin(initialValues);
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
                      <Typography color="info" variant="h2">
                        Admin Login
                      </Typography>
                    </Box>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Button
                        fullWidth
                        startIcon={<GoogleIcon />}
                        onClick={handleSubmit}
                        size="large"
                        color="secondary"
                        variant="contained"
                        className={classes.curve}
                      >
                        Login with Google
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button
                        color="primary"
                        fullWidth
                        startIcon={<FacebookIcon />}
                        onClick={handleSubmit}
                        size="large"
                        variant="contained"
                        className={classes.curve}
                      >
                        Login with Facebook
                      </Button>
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
                      disabled={isAdminLoading}
                      variant="contained"
                      className={classes.curve}
                    >
                      {isAdminLoading ? (
                        <CircularProgress size="1.5rem" />
                      ) : (
                        "Log In"
                      )}
                    </Button>
                  </Box>
                  <Typography color="textSecondary" variant="body1">
                    Have an account?{" "}
                    <Link component={RouterLink} to="/login" variant="h6">
                      Sign up
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
AdminLoginView.propTypes = {
  adminLogin: PropTypes.func.isRequired,
  isAdminAutenticated: PropTypes.bool.isRequired,
  errormsg: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  isAdminLoading: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAdminAutenticated: state.authAdmin.isAdminAutenticated,
  errormsg: state.error.msg,
  isAdminLoading: state.authAdmin.isAdminLoading,
});
export default connect(mapStateToProps, { adminLogin, clearErrors })(
  AdminLoginView
);
