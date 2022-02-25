import { GET_ERRORS, CLEAR_ERRORS } from "./types";

// func > returnErrors function
// require> error msg status password
// desc  > error type and other details

export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id },
  };
};

// func > clearerror function
// desc > clear error state

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
