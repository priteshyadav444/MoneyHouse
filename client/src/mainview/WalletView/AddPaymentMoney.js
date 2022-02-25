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
import { addPaytmMoney } from "../../action/authMemberAction";
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

const AddPaymentMoney = ({ addPaytmMoney, moneyadding, walletbalance }) => {
  const classes = useStyles();

  function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === "[object Date]";
  }

  function isObj(val) {
    return typeof val === "object";
  }

  function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  }

  function buildForm({ action, params }) {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", stringifyValue(params[key]));
      form.appendChild(input);
    });

    return form;
  }

  function post(details) {
    const form = buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  }

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
                amounttoadd: Yup.number("Enter Valid Number")
                  .max(10000)
                  .required("Enter Amount"),
              })}
              onSubmit={async (initialValues, formikApi) => {
                try {
                  var response = await addPaytmMoney(initialValues);
                  console.log(response);

                  var information = {
                    action:
                      "https://securegw.paytm.in/theia/api/v1/showPaymentPage?mid=" +
                      response.mid +
                      "&orderId=" +
                      response.orderId,
                    params: {
                      mid: response.mid,
                      orderId: response.orderId,
                      txnToken: response.resData.body.txnToken,
                    },
                  };
                  console.log(response.resData.body.txnToken);
                  post(information);
                } catch (error) {
                  console.log(error);
                }
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
                        "Pay Online"
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
AddPaymentMoney.propTypes = {
  addPaytmMoney: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  moneyadding: state.auth.moneyadding,
  walletbalance: state.auth.member.walletbalance,
});
export default connect(mapStateToProps, { addPaytmMoney })(AddPaymentMoney);
