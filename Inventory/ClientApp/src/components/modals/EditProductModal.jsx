import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import axios from "axios";

const EditProductModal = (props) => {
  const { editModalOpen, setEditModalOpen, refreshData, customer } = props;
  const [name, setName] = useState(customer.name);
  const [price, setPrice] = useState(customer.price);

  useEffect(() => {
    setName(customer.name);
    setPrice(customer.price);
  }, [editModalOpen]);

  const editProduct = () => {
    axios
      .put(`/api/Products/${customer.id}`, {
        id: customer.id,
        name: name,
        price: price,
      })
      .then((res) => {
        console.log(res);
        refreshData();
        setEditModalOpen(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Modal
      size="mini"
      dimmer="blurring"
      onClose={() => setEditModalOpen(false)}
      onOpen={() => setEditModalOpen(true)}
      open={editModalOpen}
    >
      <Modal.Header>Edit Product</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>NAME</label>
            <input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Form.Field>
          <Form.Field>
            <label>PRICE</label>
            <input
              type="number"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setEditModalOpen(false)}>
          Cancel
        </Button>
        <Button
          color="green"
          content="Edit"
          labelPosition="right"
          icon="check"
          onClick={() => {
            editProduct();
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default EditProductModal;
