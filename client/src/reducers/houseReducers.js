import {
  GET_HOUSE,
  ADD_HOUSE,
  HOUSE_LOADING,
  HOUSE_ADDING,
  HOUSE_JOINED,
  HOUSE_JOINING,
  HOUSE_JOINING_FAILED,
  GET_HOUSE_MEMBER,
  BID_SUBMITED,
  BID_SUBMITING,
  BID_SUBMITED_FAILED,
  PAYMENT_INTIALIZE,
  PAYMENT_DONE,
  PAYMENT_FAILED,
} from "../action/types";

const initialState = {
  houses: [],
  loading: null,
  addingloading: null,
  newAdded: null,
  houseJoining: null,
  housejoined: null,
  joinedhousedata: null,
  paymentstatus: null,
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case GET_HOUSE:
      return {
        ...state,
        houses: action.payload,
        loading: null,
        newAdded: null,
        addingloading: null,
        housejoined: null,
        houseJoining: null,
      };
    case GET_HOUSE_MEMBER:
      return {
        ...state,
        joinedhousedata: action.payload,
        loading: false,
        addingloading: null,
      };
    case ADD_HOUSE:
      return {
        ...state,
        newAdded: true,
        addingloading: false,
        houses: [action.payload, ...state.houses],
      };
    case BID_SUBMITING:
      return {
        ...state,
        addingloading: true,
        newAdded: false,
        paymentstatus: null,
      };
    case BID_SUBMITED:
      return {
        ...state,
        newAdded: true,
        addingloading: false,
        joinedhousedata: {
          ...state.joinedhousedata,
          result: {
            ...state.joinedhousedata.result,
            lastbidder: { ...action.payload },
          },
        },
      };
    case BID_SUBMITED_FAILED:
      return {
        ...state,
        addingloading: false,
      };
    case PAYMENT_INTIALIZE:
      return {
        ...state,
        paymentstatus: null,
      };
    case PAYMENT_DONE:
      return {
        ...state,
        paymentstatus: true,
        joinedhousedata: {
          ...state.joinedhousedata,
          memberhouse: {
            ...state.joinedhousedata.memberhouse,
            paymentdone: true,
          },
        },
      };
    case PAYMENT_FAILED:
      return {
        ...state,
        paymentstatus: false,
      };
    case HOUSE_LOADING:
      return {
        ...state,
        newAdded: false,
        loading: true,
      };
    case HOUSE_ADDING:
      return {
        ...state,
        newAdded: false,
        addingloading: true,
      };
    case HOUSE_JOINING:
      return {
        ...state,
        housejoined: false,
        houseJoining: true,
      };
    case HOUSE_JOINING_FAILED:
      return {
        ...state,
        houseJoining: false,
        housejoined: false,
      };
    case HOUSE_JOINED:
      return {
        ...state,
        ...[
          state.houses.map((data) => {
            if (data._id !== action.id.houseid) return data;

            return data.members.push(action.payload);
          }),
        ],
        housejoined: true,
        houseJoining: false,
      };
    default:
      return state;
  }
}
