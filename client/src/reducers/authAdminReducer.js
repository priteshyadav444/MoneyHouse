import {
  ADMIN_LOADED,
  ADMIN_LOADING,
  ADMIN_AUTH_ERROR,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT_SUCCESS,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  ADMIN_LOADING_MEMBER,
  REQUEST_ALL_MEMBER,
  LOAD_PENDING_TRANSACTION,
  PAYMENT_APPROVED,
} from "../action/types";

const intialState = {
  adminToken: localStorage.getItem("adminToken"),
  isAdminAutenticated: null,
  isAdminLoading: false,
  admin: null,
  members: [],
  transaction: [],
};

export default function foo(state = intialState, action) {
  switch (action.type) {
    case ADMIN_LOADING:
      return {
        ...state,
        isAdminLoading: true,
        isAdminAutenticated: null,
      };

    case ADMIN_LOADED:
      return {
        ...state,
        isAdminAutenticated: true,
        isAdminLoading: false,
        admin: action.payload,
      };

    case ADMIN_LOGIN_SUCCESS:
    case ADMIN_REGISTER_SUCCESS:
      localStorage.setItem("adminToken", action.payload.adminToken);
      return {
        ...state,
        ...action.payload,
        isAdminAutenticated: true,
        isAdminLoading: false,
      };
    case ADMIN_AUTH_ERROR:
    case ADMIN_LOGIN_FAIL:
    case ADMIN_LOGOUT_SUCCESS:
    case ADMIN_REGISTER_FAIL:
      localStorage.removeItem("adminToken");
      return {
        ...state,
        adminToken: null,
        admin: null,
        isAdminAutenticated: false,
        isAdminLoading: false,
      };
    case ADMIN_LOADING_MEMBER:
      return {
        ...state,
        isAdminLoading: true,
      };

    case REQUEST_ALL_MEMBER:
      return { ...state, isAdminLoading: false, members: [...action.payload] };

    case LOAD_PENDING_TRANSACTION:
      return {
        ...state,
        isAdminLoading: false,
        transaction: [...action.payload],
      };
    case PAYMENT_APPROVED:
      return {
        ...state,
        isAdminLoading: false,
        transaction: state.transaction.filter(
          (item) => item.requestid !== action.payload
        ),
      };
    default:
      return state;
  }
}
