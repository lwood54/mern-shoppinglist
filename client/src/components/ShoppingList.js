import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

// module will localize classes and will prevent same class names elsewhere in app from messing this up
import cls from './ShoppingList.module.css';

// normal css needed with how I'm using Reactstrap, it needs to access specific class names
// module adds unique generated class add-on, which prevents Reactstrap from working right
import './ShoppingList.css';

const ShoppingList = props => {
        // this is needed for that initial call to the DB, now since it is setup to make
        // call to outside DB, there is just an empty array for the initalState in the
        // Redux store
        useEffect(() => {
                props.getItems();
        }, []);
        const handleRemoveItem = id => {
                console.log('item with id: ', id, ' will be removed');
                props.deleteItem(id);
        };
        // map the items list to display contents and assign keys
        const displayItems = props.reduxStore.items.map(({ _id, name }, index) => {
                return (
                        <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                        <Button
                                                className={cls.removeBtn}
                                                color="danger"
                                                size="sm"
                                                onClick={() => handleRemoveItem(_id)}
                                        >
                                                &times;
                                        </Button>
                                        {name}
                                </ListGroupItem>
                        </CSSTransition>
                );
        });
        return (
                <Container>
                        <ListGroup>
                                <TransitionGroup className="shopping-list">{displayItems}</TransitionGroup>
                        </ListGroup>
                </Container>
        );
};

ShoppingList.propTypes = {
        getItems: PropTypes.func.isRequired,
        deleteItem: PropTypes.func.isRequired,
        reduxStore: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
        // I have named these differently just to understand it better, the normal convention appears to be
        // to name like: ---->      item: state.item
        reduxStore: state.itemsObj // itemsObj comes from rootReducer named in (client/src/reducers/index.js)
});

export default connect(
        mapStateToProps,
        { getItems, deleteItem }
)(ShoppingList);
