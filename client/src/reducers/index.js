// main job of this root reducer is to bring together all of the other reducers
import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
// import authReducer from './authReducer'; (this is just to show that you combine multiple reducers here)

export default combineReducers({
        itemsObj: itemReducer
        // auth: authReducer
});
