1. This example uses Bootstrap/Reactstrap
2. yarn add bootstrap reactstrap uuid react-transition-group
      - bootstrap: installs bootstrap
      - reactstrap: bootstrap styling library built for React
      - uuid: used to generate random id, but will be replaced by IDs from DB when connected
      - react-transition-group: helps with animations

## Inside the client src/ index.js file

3. add the bootstrap css

      - bootstrap import: import 'bootstrap/dist/css/bootstrap.min.css'

4. Now import and use components as needed

### links to libraries

- Reactstrap: https://reactstrap.github.io/
- Bootstrap (main): https://getbootstrap.com/
- react-transition-group: https://github.com/reactjs/react-transition-group
- uuid: https://github.com/kelektiv/node-uuid#readme

## using Redux

1. yarn add redux react-redux

      - redux: state management tool (can be used with React): https://redux.js.org/
      - react-redux: allows Redux to be used easily with React: https://redux.js.org/basics/usage-with-react

      * redux-thunk: allows you to write async logic that interacts with the redux store

2. create the store.js inside client src/ directory

### store.js

- define initial state
- define middleware
- define store
- export store

3. Bring in the "Provider" to use Redux with our React app, Provider is from 'react-redux'

### App.js

4. import {Provider} from 'react-redux';
5. import store from './store';
6. Wrap the entire app in the Provider component

      ```
      class App extends Component {
           render() {
                   return (
                           <Provider store={store}>
                                   <div className="App">
                                           <AppNavbar />
                                           <ShoppingList />
                                   </div>
                           </Provider>
                   );
           }
      }

      ```

7. create the rootReducer, which will import and combine all reducers in the app

      - src/reducers/index.js in this example

8. create the needed reducers, for this small project I just have itemReducer.js

### reducers/itemReducer.js

9. set initial state

      - right now, I set that to a made up array of items, but will later be set by the DB

10. create directory & file client/src/actions/types.js

### client/src/actions/types.js

- this will house the different actions that can be called in the reducer
     - set up like: export const GET_ITEMS = 'GET_ITEMS';

11. now import the actions types into the itemReducer
12. export a function that is passed the initial state, and action object which contains the action types

```
export default function(state = initialState, action) {
        switch (action.type) {
                case GET_ITEMS:
                        return {
                                ...state
                        };
                default:
                        return state;
        }
  }
```

13. create actions for our items, do this inside a new file:

- client/src/actions/itemActions.js
     - example action:
     ```
     export const getItems = () => {
          return {
                  type: GET_ITEMS
          };
     };
     * then you can call this action from within the Component that needs the data and then the reducer will access the data from the store
     ```

## IMPORTANT STETP TO CONNECT STORE

### src/components/ShoppingList.js

In order to use the data in the Reduc store:

1. import { connect } from 'react-redux'; //allows us to get state from Redux
2. import { getItems } from '../actions/itemActions'; // allows use of that getItems() function
3. Now, instead of exporting ShoppingList component like normal, instead you must wrap pass it as the return function
      - export default connect()(ShoppingList);
      * inside connect(), 2 arguments:
           - mapStateToProps function - allows use of props.items access to data from Redux state
           - { getItems } - an object of actions to be used
