import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import axios from "axios";

const EditStoreModal = (props) => {
  const { editModalOpen, setEditModalOpen, refreshData, store } = props;
  const [name, setName] = useState(store.name);
  const [address, setAddress] = useState(store.address);

  useEffect(() => {
    setName(store.name);
    setAddress(store.address);
  }, [editModalOpen]);

  const editStore = () => {
    axios
      .put(`/api/Stores/${store.id}`, {
        id: store.id,
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
      <Modal.Header>Edit Store</Modal.Header>
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
            editStore();
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default EditStoreModal;
