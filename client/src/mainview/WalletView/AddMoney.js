import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Container,
  TextField,
  makeStyles,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import Page from "../../components/Page";
import { addMoney } from "../../action/authMemberAction";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    paddingBottom: theme.spacing(1),
  },
  btn: {
    borderRadius: theme.spacing(3),
  },
}));

const AddMoney = ({ addMoney, moneyadding, walletbalance }) => {
  const classes = useStyles();

  return (
    <>
      <Page className={classes.root} title="Add Money">
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
                amounttoadd: "",
              }}
              validationSchema={Yup.object().shape({
                amounttoadd: Yup.number().max(100000).required("Enter Amount"),
              })}
              onSubmit={(initialValues, formikApi) => {
                addMoney(initialValues);
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                setFieldValue,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box mb={1}>
                    <Box display="flex" justifyContent="center" mb={2}>
                      <Typography
                        color="textPrimary"
                        display="inline"
                        variant="subtitle2"
                      >
                        Current Wallet Balance :
                      </Typography>
                      <Typography
                        color="textPrimary"
                        variant="h4"
                        display="block"
                      >
                        ₹{Number(walletbalance).toLocaleString("en-IN")}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box mt={1}>
                      <Typography
                        color="textPrimary"
                        variant="subtitle2"
                        display="block"
                      >
                        Enter Amount
                      </Typography>
                      <TextField
                        error={Boolean(
                          touched.amounttoadd && errors.amounttoadd
                        )}
                        fullWidth
                        helperText={touched.amounttoadd && errors.amounttoadd}
                        margin="normal"
                        name="amounttoadd"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.amounttoadd}
                        variant="outlined"
                        placeholder="₹500"
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Button
                      color="secondary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      disabled={moneyadding}
                      className={classes.btn}
                    >
                      {moneyadding === true ? (
                        <CircularProgress size="1.5rem" color="inherit" />
                      ) : (
                        "Request Money"
                      )}
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Container>
        </Box>
      </Page>
    </>
  );
};
AddMoney.propTypes = {
  addMoney: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  moneyadding: state.auth.moneyadding,
  walletbalance: state.auth.member.walletbalance,
});
export default connect(mapStateToProps, { addMoney })(AddMoney);
