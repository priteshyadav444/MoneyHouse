import { TextField } from "@material-ui/core";
import React, { useEffect } from "react";

const CalculatedField = ({ values, setFieldValue }) => {
  useEffect(() => {
    var val = 0;
    if (values.entryamount && values.noofmember) {
      val = values.entryamount * values.noofmember;
    }
    setFieldValue("poolamount", val);
  }, [values, setFieldValue]);

  return (
    <TextField
      id="totalPrice"
      type="number"
      name="totalPrice"
      value={values.poolamount}
      variant="outlined"
      label="Entry Amount"
      disabled="true"
      fullWidth
    />
  );
};

export default CalculatedField;
