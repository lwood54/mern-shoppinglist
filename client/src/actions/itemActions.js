import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from './types';

// this is one action that will be used.
// This object is returned when getItems() is called, like action.type in itemReducer.js
// But we would call this function from within our ShoppingList components instead of having this function
// originally placed in that ShoppingList component
export const getItems = () => {
        return {
                type: GET_ITEMS
        };
};
