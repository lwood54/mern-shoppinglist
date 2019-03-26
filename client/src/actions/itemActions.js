import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

// this is one action that will be used.
// This object is returned when getItems() is called, like action.type in itemReducer.js
// But we would call this function from within our ShoppingList components instead of having this function
// originally placed in that ShoppingList component
export const getItems = () => dispatch => {
        // PREVIOUSLY...
        // return {
        //         type: GET_ITEMS
        // };
        // NOW...
        // can access Redux store's dispatch and we are calling the setItemsLoading() action
        dispatch(setItemsLoading());
        axios.get('/api/items') // shortened because of proxy, returns a promise with response
                .then(res => {
                        dispatch({
                                type: GET_ITEMS,
                                payload: res.data
                        });
                });
};

export const addItem = newItem => dispatch => {
        axios.post('/api/items', newItem).then(res => {
                dispatch({
                        type: ADD_ITEM,
                        payload: res.data
                });
        });
};

export const deleteItem = id => dispatch => {
        axios.delete(`/api/items/${id}`).then(res => {
                dispatch({
                        type: DELETE_ITEM,
                        payload: id
                });
        });
};

export const setItemsLoading = () => {
        return {
                type: ITEMS_LOADING
        };
};
