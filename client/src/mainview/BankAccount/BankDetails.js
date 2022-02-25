import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
  },
}));

const BankDetails = ({ data, className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    accountno: "",
    conformaccount: "",
    ifsccode: "",
    phone: "",
    state: "GUJARAT",
    country: "INDIA",
  });
  useEffect(() => {
    setValues({
      accountno: "09578122223333",
      conformaccount: "09578122223333",
      ifsccode: "BARB0CHANOD",
    });
  }, [data]);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Bank Details"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={5}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Account No"
                name="accountno"
                onChange={handleChange}
                required
                value={values.accountno}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Conform Account "
                name="conformaccount"
                onChange={handleChange}
                required
                type="password"
                value={values.conformaccount}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="IFSC Code"
                name="ifsccode"
                onChange={handleChange}
                required
                value={values.ifsccode}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained">
            Add Bank Details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

BankDetails.propTypes = {
  className: PropTypes.string,
};

export default BankDetails;
