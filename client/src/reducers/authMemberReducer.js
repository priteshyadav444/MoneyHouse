import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  MEMBER_LOADED,
  MEMBER_LOADING,
  UPDATE_MEMBER_HOUSE,
  UPDATE_MEMBER_WALLET,
  UPDATE_JOINED_HOUSES,
  NOTIFICATION_LOAD,
  NOTIFICATION_CLICK,
  MONEY_ADDED,
  ADD_MONEY_REQUESTED,
} from "../action/types";

const intialState = {
  memberToken: localStorage.getItem("memberToken"),
  isMemberAutenticated: null,
  isMemberLoading: null,
  member: null,
  moneyadding: null,
};

export default function foo(state = intialState, action) {
  switch (action.type) {
    case MEMBER_LOADING:
      return {
        ...state,
        isMemberLoading: true,
        isMemberAutenticated: null,
      };

    case MEMBER_LOADED:
      return {
        ...state,
        isMemberAutenticated: true,
        isMemberLoading: false,
        member: action.payload,
      };
    case UPDATE_JOINED_HOUSES:
      return {
        ...state,
        member: {
          ...state.member,
          housesjoined: action.payload,
          walletbalance: action.walletbalance,
          creditbalance: action.creditbalance,
          withdrawnbalance: action.withdrawnbalance,
          wallettransaction: [...action.wallettransaction],
        },
      };
    case UPDATE_MEMBER_HOUSE:
      return {
        ...state,
        member: {
          ...state.member,
          walletbalance: action.walletbalance,
          wallettransaction: [...state.member.wallettransaction, action.trans],
          housesjoined: [...state.member.housesjoined, action.payload],
          notifications: {
            notificationcount: state.member.notifications.notificationcount + 1,
            messages: [
              ...state.member.notifications.messages,
              action.notificationdata,
            ],
          },
        },
      };
    case UPDATE_MEMBER_WALLET:
      return {
        ...state,
        member: {
          ...state.member,
          walletbalance: action.walletbalance,
          wallettransaction: [...state.member.wallettransaction, action.trans],
        },
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("memberToken", action.payload.memberToken);
      return {
        ...state,
        ...action.payload,
        isMemberAutenticated: true,
        isMemberLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("memberToken");
      return {
        ...state,
        memberToken: null,
        member: null,
        isMemberAutenticated: false,
        isMemberLoading: false,
      };
    case NOTIFICATION_LOAD:
      return {
        ...state,
        moneyadding: null,
        member: {
          ...state.member,
          ...action.payload,
        },
      };
    case NOTIFICATION_CLICK:
      return {
        ...state,
        member: {
          ...state.member,
          notifications: {
            ...state.member.notifications,
            notificationcount: 0,
          },
        },
      };
    case ADD_MONEY_REQUESTED:
      return {
        ...state,
        moneyadding: true,
      };
    case MONEY_ADDED:
      return {
        ...state,
        member: {
          ...state.member,
          wallettransaction: [
            ...state.member.wallettransaction,
            action.payload,
          ],
        },
        moneyadding: false,
      };
    default:
      return state;
  }
}
