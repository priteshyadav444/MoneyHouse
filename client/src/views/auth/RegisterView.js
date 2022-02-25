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
import { adminRegister } from "../../action/authAdminAction";
import { clearErrors } from "../../action/errorAction";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3.5),
  },
  btn: {
    borderRadius: theme.spacing(3),
  },
}));

const RegisterView = ({
  admin,
  adminRegister,
  isAdminAutenticated,
  errormsg,
  clearErrors,
  isAdminLoading,
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    setOpen(false);
  };
  const classes = useStyles();
  let history = useHistory();
  const [err, setErr] = useState("");
  useEffect(() => {
    if (isAdminAutenticated === false) {
      setErr(errormsg);
      setOpen(true);

      console.log("hallo");
    } else if (isAdminAutenticated === true) {
      setErr("Logged In Succesfully");
      setOpen(true);
      setTimeout(function () {
        history.push("/");
      }, 1000);
    }
    // eslint-disable-next-line
  }, [isAdminAutenticated]);

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
      <Page className={classes.root} title="Register">
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
                  .max(255)
                  .required("password is required"),
                policy: Yup.boolean().oneOf(
                  [true],
                  "This field must be checked"
                ),
              })}
              onSubmit={(initialValues, formikApi) => {
                clearErrors();
                formikApi.resetForm({
                  initialValues: {
                    initialValues,
                    email: "",
                    password: "",
                  },
                });
                adminRegister(initialValues);
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
                        {admin ? "Admin Signup" : "Member Signup"}
                      </Typography>
                    </Box>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Use your email to create new account
                    </Typography>
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
                      I have read the{" "}
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
                      disabled={isAdminLoading}
                      variant="contained"
                      className={classes.btn}
                    >
                      {isAdminLoading ? <CircularProgress /> : "Sign up now"}
                    </Button>
                  </Box>
                  <Typography color="textSecondary" variant="body1">
                    Have an account?{" "}
                    <Link component={RouterLink} to="/login" variant="h6">
                      Sign in
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
RegisterView.propTypes = {
  adminRegister: PropTypes.func.isRequired,
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
export default connect(mapStateToProps, { adminRegister, clearErrors })(
  RegisterView
);
