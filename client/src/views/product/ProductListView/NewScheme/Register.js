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
} from "@material-ui/core";
import Page from "../../../../components/Page";
import { addHouse, setHouseAdding } from "../../../../action/houseAction";
import CalculatedField from "./CalculatedField";

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

const Register = ({ addingloading, addHouse, newAdded }) => {
  const classes = useStyles();

  return (
    <>
      <Page className={classes.root} title="Create House">
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
                entryamount: "1000",
                noofmember: "5",
                poolamount: "",
              }}
              validationSchema={Yup.object().shape({
                entryamount: Yup.number()
                  .max(100000)
                  .required("Entry Amount Required"),
                noofmember: Yup.number()
                  .max(20)
                  .required("No of Member Required"),
                poolamount: Yup.number().max(2000000),
              })}
              onSubmit={(initialValues, formikApi) => {
                addHouse(initialValues);
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
                  <Box mb={3}>
                    <TextField
                      error={Boolean(touched.entryamount && errors.entryamount)}
                      fullWidth
                      helperText={touched.entryamount && errors.entryamount}
                      label="Entry Amount"
                      margin="normal"
                      name="entryamount"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.entryamount}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.noofmember && errors.noofmember)}
                      fullWidth
                      helperText={touched.noofmember && errors.noofmember}
                      label="No Of Member"
                      margin="normal"
                      name="noofmember"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.noofmember}
                      variant="outlined"
                    />

                    <CalculatedField
                      id="poolamount"
                      type="number"
                      name="poolamount"
                      value={values.poolamount}
                      values={values}
                      setFieldValue={setFieldValue}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Box>
                  <Box my={2}>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      disabled={addingloading}
                      variant="contained"
                      className={classes.btn}
                    >
                      {addingloading ? (
                        <CircularProgress size="1.5rem" />
                      ) : (
                        "Create Schema"
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
Register.propTypes = {
  setHouseAdding: PropTypes.func.isRequired,
  newAdded: PropTypes.bool.isRequired,
  addingloading: PropTypes.object.isRequired,
  houses: PropTypes.object.isRequired,
  addHouse: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  houses: state.houses,
  addingloading: state.houses.addingloading,
  newAdded: state.houses.newAdded,
});
export default connect(mapStateToProps, { setHouseAdding, addHouse })(Register);
