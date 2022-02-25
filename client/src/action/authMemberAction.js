import axios from "axios";
import { returnErrors } from "./errorAction";

import {
  MEMBER_LOADED,
  MEMBER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ADMIN_LOGOUT_SUCCESS,
  NOTIFICATION_CLICK,
  NOTIFICATION_LOAD,
  MONEY_ADDED,
  ADD_MONEY_REQUESTED,
} from "./types";

// func > login function
// require> email password
// return  > error or success
//route /auth
export const memberLogin = (body) => (dispatch) => {
  dispatch({ type: MEMBER_LOADING });
  dispatch({ type: ADMIN_LOGOUT_SUCCESS });

  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post("/api/member/auth", body, config)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data.msg, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// func > louout function
// desc> remove token form local storage
// require > nothing on clock logout
//route /
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// func > register function
// desc> insert token to  local storage and insert data to MEMBERs document
// require > MEMBERname,email,password
//route /MEMBERs
export const memberRegister = (body) => (dispatch) => {
  dispatch({ type: ADMIN_LOGOUT_SUCCESS });
  dispatch({ type: MEMBER_LOADING });
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post("/api/member/", body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          "REGISTER_FAIL"
        )
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// func > loadMEMBER function
// desc> check token available or not in localstorage if availabe login automatically
// require > localstorage token

export const loadMember = () => (dispatch, getState) => {
  dispatch({ type: ADMIN_LOGOUT_SUCCESS });
  dispatch({ type: MEMBER_LOADING });

  const memberToken = getState().auth.memberToken;
  // Headers

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (memberToken) {
    config.headers["x-auth-token"] = memberToken;
  }

  axios
    .get("/api/member/auth/load", config)
    .then((res) =>
      dispatch({
        type: MEMBER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      if (err.response) {
        dispatch(returnErrors(err.response.data.msg, err.response.status));
      }
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const notificationLoad = () => (dispatch, getState) => {
  const memberToken = getState().auth.memberToken;
  // Headers

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (memberToken) {
    config.headers["x-auth-token"] = memberToken;
  }

  axios
    .get("/api/member/notification/load", config)
    .then((res) =>
      dispatch({
        type: NOTIFICATION_LOAD,
        payload: res.data,
      })
    )
    .catch((err) => {
      if (err.response) {
        dispatch(returnErrors(err.response.data.msg, err.response.status));
      }
    });
};

export const notificationClick = () => (dispatch, getState) => {
  const memberToken = getState().auth.memberToken;
  // Headers

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (memberToken) {
    config.headers["x-auth-token"] = memberToken;
  }

  axios
    .get("/api/member/notification/click", config)
    .then((res) =>
      dispatch({
        type: NOTIFICATION_CLICK,
      })
    )
    .catch((err) => {
      if (err.response) {
        dispatch(returnErrors(err.response.data.msg, err.response.status));
      }
    });
};

export const addMoney = (data) => (dispatch, getState) => {
  dispatch({ type: ADD_MONEY_REQUESTED });
  const token = getState().auth.memberToken;
  const membername = getState().auth.member.firstname;
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
  const body = { membername, ...data };

  axios
    .post("/api/member/addmoney", body, config)
    .then((res) => {
      dispatch({
        type: MONEY_ADDED,
        payload: res.data.trans,
      });
    })

    .catch((err) => {
      console.log(err);
      if (err.response) {
        dispatch(returnErrors(err.response.data.msg, err.response.status));
      }

      // dispatch(returnErrors(err.response.data.msg, err.response.status));
    });
};

export const addPaytmMoney = (data) => (dispatch, getState) => {
  dispatch({ type: ADD_MONEY_REQUESTED });
  const token = getState().auth.memberToken;
  const membername = getState().auth.member.firstname;
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
  const body = { membername, ...data };
  console.log(body);
  try {
    const data = axios
      .post("/api/payment", body, config)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("Error" + err);
        if (err.response) {
          dispatch(returnErrors(err.response.data.msg, err.response.status));
        }
      });

    return data;
  } catch (error) {
    console.log(error);
  }
};
