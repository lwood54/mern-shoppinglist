import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';

const ItemModal = props => {
        const [openModal, setOpenModal] = useState(false);
        const [name, setName] = useState('');
        const toggle = () => {
                setOpenModal(!openModal);
        };
        const handleSubmit = e => {
                e.preventDefault();
                const newItem = {
                        name
                };
                // multiple ways to dispatch from store
                // option 1 - import above from alternate file of actions, then load as 2nd argument
                // in mapStateToProps
                // props.addItem(newItem);
                // props.dispatch(addItem(newItem));
                // props.dispatch({ type: 'ADD_ITEM', payload: newItem });
                console.log('props.items: ', props.reduxStore.items.length);
                props.addItem(newItem);
                toggle();
                setName('');
        };
        const handleChange = e => {
                setName(e.target.value);
        };
        const handleUnderstand = () => {
                toggle();
        };
        return (
                <div>
                        <Button color="dark" style={{ marginBottom: '2rem' }} onClick={toggle}>
                                Add Item
                        </Button>
                        <Modal isOpen={openModal} toggle={toggle}>
                                <ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
                                <ModalBody>
                                        {props.reduxStore.items.length < 10 ? (
                                                <Form onSubmit={handleSubmit}>
                                                        <FormGroup>
                                                                <Label for="item">Item</Label>
                                                                <Input
                                                                        type="text"
                                                                        name="name"
                                                                        id="item"
                                                                        placeholder="Add shopping item"
                                                                        onChange={handleChange}
                                                                        value={name}
                                                                />
                                                                <Button
                                                                        color="dark"
                                                                        style={{ marginTop: '2rem' }}
                                                                        block
                                                                >
                                                                        Add Item
                                                                </Button>
                                                        </FormGroup>
                                                </Form>
                                        ) : (
                                                <div>
                                                        <h4>
                                                                Sorry, this is just a practice project and
                                                                I've limited the list length to 10 items or
                                                                fewer.
                                                        </h4>
                                                        <Button
                                                                color="dark"
                                                                style={{ marginTop: '2rem' }}
                                                                block
                                                                onClick={handleUnderstand}
                                                        >
                                                                I understand
                                                        </Button>
                                                </div>
                                        )}
                                </ModalBody>
                        </Modal>
                </div>
        );
};

const mapStateToProps = state => ({
        reduxStore: state.itemsObj
});

export default connect(
        mapStateToProps,
        { addItem }
)(ItemModal);
// const mapDispatchToProps = {
//         addItem
// };
// export default connect(
//         mapStateToProps,
//         mapDispatchToProps
// )(ItemModal);
// you can do above, or you can just pass object directly as second argument
// redux is recognizing the object and automatically convering it
