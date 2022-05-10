import { combineReducers,createStore,compose,applyMiddleware } from "redux";
import { userReducer,blogReducer,tagReducer } from "./Reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  userResponse: userReducer,
  blogResponse: blogReducer,
  tagResponse: tagReducer,
});

const store = createStore(
    // persistedReducer,
    reducer,
    composeEnhancers(applyMiddleware())
  );
export default store;