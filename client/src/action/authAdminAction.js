import axios from "axios";
import { returnErrors } from "./errorAction";

import {
  ADMIN_LOADED,
  ADMIN_LOADING,
  ADMIN_AUTH_ERROR,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT_SUCCESS,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  LOGOUT_SUCCESS,
  ADMIN_LOADING_MEMBER,
  LOAD_PENDING_TRANSACTION,
  REQUEST_ALL_MEMBER,
  PAYMENT_APPROVED,
} from "./types";

// func > login function
// require> email password
// return  > error or success
//route /auth
export const adminLogin = (body) => (dispatch) => {
  dispatch({
    type: ADMIN_LOADING,
  });
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post("/api/admin/auth", body, config)
    .then((res) =>
      dispatch({
        type: ADMIN_LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          "ADMIN_LOGIN_FAIL"
        )
      );
      dispatch({
        type: ADMIN_LOGIN_FAIL,
      });
    });
};

// func > louout function
// desc> remove token form local storage
// require > nothing on clock logout
//route /
export const adminLogout = () => {
  return {
    type: ADMIN_LOGOUT_SUCCESS,
  };
};

// func > register function
// desc> insert token to  local storage and insert data to users document
// require > username,email,password
//route /api/admin
export const adminRegister = (data) => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  dispatch({
    type: ADMIN_LOADING,
  });

  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  const body = data;
  axios
    .post("/api/admin", body, config)
    .then((res) => {
      dispatch({ type: LOGOUT_SUCCESS });
      dispatch({
        type: ADMIN_REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          "ADMIN_REGISTER_FAIL"
        )
      );
      dispatch({
        type: ADMIN_REGISTER_FAIL,
      });
    });
};

// func > load All Member function
// desc> check token available or not in localstorage if availabe login automatically
// require > localstorage token

export const loadAllMemberData = () => (dispatch, getState) => {
  dispatch({ type: ADMIN_LOADING_MEMBER });
  const token = getState().authAdmin.adminToken;
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios
    .get("/api/admin/getmember", config)
    .then((res) =>
      dispatch({
        type: REQUEST_ALL_MEMBER,
        payload: res.data,
      })
    )
    .catch((err) => {
      if (err.response) {
        dispatch(returnErrors(err.response.data.msg, err.response.status));
      }
    });
};
// func > loadUser function
// desc> check token available or not in localstorage if availabe login automatically
// require > localstorage token

export const loadAdmin = () => (dispatch, getState) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
  dispatch({ type: ADMIN_LOADING });
  const token = getState().authAdmin.adminToken;
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios
    .get("/api/admin/auth/load", config)
    .then((res) =>
      dispatch({
        type: ADMIN_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      if (err.response) {
        dispatch(returnErrors(err.response.data.msg, err.response.status));
      }

      dispatch({
        type: ADMIN_AUTH_ERROR,
      });
    });
};

// func > loadUser function
// desc> check token available or not in localstorage if availabe login automatically
// require > localstorage token
export const paymentApprove =
  (memberid, requestid, amount, paymentaction) => (dispatch, getState) => {
    const token = getState().authAdmin.adminToken;

    // Headers
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // If token, add to headers
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    const body = { memberid, requestid, amount, paymentaction };

    axios
      .post("/api/admin/payment", body, config)
      .then((res) => {
        dispatch({
          type: PAYMENT_APPROVED,
          payload: res.data.requestid,
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          dispatch(returnErrors(err.response.data.msg, err.response.status));
        }
      });
  };

// func > load All Pending Transaction
// desc> check token available or not in localstorage if availabe login automatically
// require > localstorage token

export const loadTransaction = () => (dispatch, getState) => {
  dispatch({ type: ADMIN_LOADING_MEMBER });
  const token = getState().authAdmin.adminToken;
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios
    .get("/api/admin/loadtransaction", config)
    .then((res) =>
      dispatch({
        type: LOAD_PENDING_TRANSACTION,
        payload: res.data.pendingtransaction,
      })
    )
    .catch((err) => {
      if (err.response) {
        dispatch(returnErrors(err.response.data.msg, err.response.status));
      }
    });
};
