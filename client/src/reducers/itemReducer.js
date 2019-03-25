// this is where state will go and actions are checked here, then it will dispatch can add a payload

import uuid from 'uuid';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../actions/types';

// setting initial state, but will later be set by our DB connection
const initialState = {
        items: [
                { id: uuid(), name: 'Eggs' },
                { id: uuid(), name: 'Milk' },
                { id: uuid(), name: 'Tofu' },
                { id: uuid(), name: 'Water' }
        ]
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
                                ...state // returning default value of initialState from array above
                        };
                default:
                        return state;
        }
}
