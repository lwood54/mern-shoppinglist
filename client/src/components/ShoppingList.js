import React, { useState, useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import PropTypes from 'prop-types';

// module will localize classes and will prevent same class names elsewhere in app from messing this up
import cls from './ShoppingList.module.css';

// normal css needed with how I'm using Reactstrap, it needs to access specific class names
// module adds unique generated class add-on, which prevents Reactstrap from working right
import './ShoppingList.css';

const ShoppingList = props => {
        // create state and define inita/default state of items
        const [items, setItems] = useState(props.itemsFromReduxStore.items);

        useEffect(() => {
                props.getItems();
                console.log('props.item: ', props.itemsFromReduxStore.items);
        }, []);

        const handleAddItem = () => {
                // prompt for name
                const name = prompt('Enter Item');
                // if truthy, then add it items array and add ID
                if (name) {
                        setItems([...items, { id: uuid(), name }]);
                }
        };

        const handleRemoveItem = id => {
                // using id, go through items array and only return item if the id does NOT equal id passed
                let newItems = items.filter(item => item.id !== id);
                setItems(newItems);
        };
        // map the items list to display contents and assign keys
        const displayItems = items.map(({ id, name }, index) => {
                console.log(`item: ${name} @ index: ${index}`);
                return (
                        <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                        <Button
                                                className={cls.removeBtn}
                                                color="danger"
                                                size="sm"
                                                onClick={() => handleRemoveItem(id)}
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
                        <Button color="dark" style={{ marginBottom: '2rem' }} onClick={handleAddItem}>
                                Add Item
                        </Button>
                        <ListGroup>
                                <TransitionGroup className="shopping-list">{displayItems}</TransitionGroup>
                        </ListGroup>
                </Container>
        );
};

ShoppingList.propTypes = {
        getItems: PropTypes.func.isRequired,
        itemsFromReduxStore: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
        // I have named these differently just to understand it better, the normal convention appears to be
        // to name like: ---->      item: state.item
        itemsFromReduxStore: state.itemsObj // itemsObj comes from rootReducer named in (client/src/reducers/index.js)
});

export default connect(
        mapStateToProps,
        { getItems }
)(ShoppingList);
