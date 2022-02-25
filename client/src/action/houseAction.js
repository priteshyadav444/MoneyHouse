import axios from "axios";
import {
  HOUSE_JOINING,
  GET_HOUSE,
  ADD_HOUSE,
  HOUSE_LOADING,
  HOUSE_ADDING,
  HOUSE_JOINED,
  UPDATE_MEMBER_HOUSE,
  HOUSE_JOINING_FAILED,
  GET_HOUSE_MEMBER,
  BID_SUBMITED_FAILED,
  BID_SUBMITED,
  BID_SUBMITING,
  PAYMENT_DONE,
  PAYMENT_INTIALIZE,
  PAYMENT_FAILED,
  UPDATE_MEMBER_WALLET,
  CLEAR_ERRORS,
  UPDATE_JOINED_HOUSES,
} from "./types";
import { returnErrors } from "./errorAction";

//func > getHOUSE
//desc > get all HOUSE
//roure > /HOUSE
export const getHouse = (data) => (dispatch, getState) => {
  dispatch(setHouseLoading());
  var id = null;
  if (data === false) {
    id = getState().auth.member._id;
  }

  const config = {
    headers: {
      body: data,
    },
  };
  axios
    .get("/api/house", config)
    .then((res) =>
      dispatch({
        type: GET_HOUSE,
        payload: res.data,
        mid: id,
      })
    )
    .catch((err) => {
      if (err.response) {
        dispatch(returnErrors(err.response.data.msg, err.response.status));
      }
    });
};

export const getHouseMember = (data) => (dispatch, getState) => {
  dispatch(setHouseLoading());
  dispatch({ type: CLEAR_ERRORS });
  const token = getState().auth.memberToken;
  const config = {
    headers: {
      "Content-type": "application/json",
      body: data,
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  axios
    .get("/api/house/housemember", config)
    .then((res) =>
      dispatch({
        type: GET_HOUSE_MEMBER,
        payload: res.data,
      })
    )
    .catch((err) => {
      if (err.response) {
        dispatch(returnErrors(err.response.data.msg, err.response.status));
      }
      console.log(err);
    });
};

//func > addItem
//desc > addItem  HOUSE
//roure > api/house/add
export const addHouse = (house) => (dispatch) => {
  dispatch(setHouseAdding());
  axios
    .post("/api/house/add", house)
    .then((res) =>
      dispatch({
        type: ADD_HOUSE,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
    });
};

//func > setHOUSELoading
//desc > set HOUSE Loading  HOUSE

export const setHouseLoading = (item) => {
  return {
    type: HOUSE_LOADING,
  };
};
export const setHouseAdding = (item) => {
  return {
    type: HOUSE_ADDING,
  };
};

export const addMemberToHouse =
  (houseid, housepool, entryamount, balance) => (dispatch, getState) => {
    dispatch({ type: HOUSE_JOINING });
    const token = getState().auth.memberToken;
    const name = getState().auth.member.firstname;
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
    const body = { houseid, housepool, name, entryamount, balance };

    axios
      .post("/api/house/addmember", body, config)
      .then((res) => {
        dispatch({
          type: UPDATE_MEMBER_HOUSE,
          payload: res.data.housedata,
          notificationdata: res.data.notificationdata,
          walletbalance: res.data.walletbalance,
          trans: res.data.trans,
        });
        dispatch({
          type: HOUSE_JOINED,
          id: res.data.housedata,
          payload: res.data.memberdata,
        });
      })

      .catch((err) => {
        console.log(err);
        if (err.response) {
          dispatch(returnErrors(err.response.data.msg, err.response.status));
        }
        dispatch({ type: HOUSE_JOINING_FAILED });

        // dispatch(returnErrors(err.response.data.msg, err.response.status));
      });
  };

export const setSubmitingBid = (item) => {
  return {
    type: BID_SUBMITING,
  };
};

//submitBid

export const submitBid = (amount, houseid) => (dispatch, getState) => {
  dispatch(setSubmitingBid());
  const token = getState().auth.memberToken;
  const name = getState().auth.member.firstname;
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
  const body = { name, amount, houseid };

  axios
    .post("/api/house/submitbid", body, config)
    .then((res) =>
      dispatch({
        type: BID_SUBMITED,
        payload: res.data.lastbiddata,
      })
    )
    .catch((err) => {
      if (err.response)
        dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({ type: BID_SUBMITED_FAILED });
    });
};

export const payment =
  (houseid, entryamount, balance) => (dispatch, getState) => {
    dispatch({ type: PAYMENT_INTIALIZE });
    const token = getState().auth.memberToken;
    const name = getState().auth.member.firstname;
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
    const body = { houseid, name, entryamount, balance };

    axios
      .post("/api/house/payment", body, config)
      .then((res) => {
        dispatch({
          type: PAYMENT_DONE,
        });
        dispatch({
          type: UPDATE_MEMBER_WALLET,
          walletbalance: res.data.walletbalance,
          trans: res.data.trans,
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          dispatch(returnErrors(err.response.data.msg, err.response.status));
        }
        dispatch({ type: PAYMENT_FAILED });
      });
  };

//func > updateHouseJoined
//desc > get all Updated joined Houses
//roure > /housejoined
export const updateHouseJoined = () => (dispatch, getState) => {
  const token = getState().auth.memberToken;
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
    .get("/api/house/update", config)
    .then((res) =>
      dispatch({
        type: UPDATE_JOINED_HOUSES,
        payload: res.data.housesjoined,
        wallettransaction: res.data.wallettransaction,
        walletbalance: res.data.walletbalance,
        creditbalance: res.data.creditbalance,
        withdrawnbalance: res.data.withdrawnbalance,
      })
    )
    .catch((err) => {
      if (err.response) {
        dispatch(returnErrors(err.response.data.msg, err.response.status));
      }
    });
};
