import { combineReducers } from "redux";
import authMemberReducer from "./authMemberReducer";
import houseReducer from "./houseReducers";
import errorReducer from "./errorReducer";
import authAdminReducer from "./authAdminReducer";
import { withReduxStateSync } from "redux-state-sync";
const rootReducer = combineReducers({
  houses: houseReducer,
  auth: authMemberReducer,
  error: errorReducer,
  authAdmin: authAdminReducer,
});
export default withReduxStateSync(rootReducer);
