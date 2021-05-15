import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import axios from "axios";

const EditCustomerModal = (props) => {
  const { editModalOpen, setEditModalOpen, refreshData, customer } = props;
  const [name, setName] = useState(customer.name);
  const [address, setAddress] = useState(customer.address);

  useEffect(() => {
    setName(customer.name);
    setAddress(customer.address);
  }, [editModalOpen]);

  const editCustomer = () => {
    axios
      .put(`/api/Customers/${customer.id}`, {
        id: customer.id,
        name: name,
        address: address,
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
      <Modal.Header>Edit Customer</Modal.Header>
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
            <label>ADDRESS</label>
            <input
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
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
            editCustomer();
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default EditCustomerModal;
