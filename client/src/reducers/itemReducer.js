// this is where state will go and actions are checked here, then it will dispatch can add a payload
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

// setting initial state, but will later be set by our DB connection
const initialState = {
        items: [],
        loading: false
};

// we export the itemReducer function that is passed the value of state with default value of initialState,
// and an action object that will have a type on it
// this function will be imported into the rootReducer (client/src/reducers/index.js)
// once imported, it will be exported as a reducer function that can be accessed elsewhere in the application
// when this is accessed,
export default function(state = initialState, action) {
        switch (action.type) {
                case GET_ITEMS:
                        return {
                                ...state, // returning default value of initialState from array above
                                items: action.payload,
                                loading: false
                        };
                case DELETE_ITEM:
                        return {
                                ...state,
                                items: state.items.filter(item => item._id !== action.payload)
                                // had to change item.id to item._id because of how mLab
                                // auto assigns id, but defines it _id
                        };
                case ADD_ITEM:
                        return {
                                ...state,
                                // items: state.items.concat(action.payload)
                                items: [action.payload, ...state.items]
                        };
                case ITEMS_LOADING:
                        return {
                                ...state,
                                loading: true
                        };
                default:
                        return state;
        }
}
