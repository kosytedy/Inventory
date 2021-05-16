import React, {useState} from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import axios from 'axios';

const CreateStoreModal = (props) => {
  const { createModalOpen, setCreateModalOpen, refreshData } = props;
  const [name, setName] = useState();
  const [address, setAddress] = useState();

  const createStore = () => {
    axios
        .post('/api/Stores/', {
            name: name,
            address: address
        })
        .then((res) => {
            console.log(res);
            refreshData();
            setCreateModalOpen(false);
        })
        .catch(function (error) {
            console.log(error);
        });
}

  return (
    <Modal
      size="mini"
      dimmer="blurring"
      onClose={() => setCreateModalOpen(false)}
      onOpen={() => setCreateModalOpen(true)}
      open={createModalOpen}
    >
      <Modal.Header>Create Store</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>NAME</label>
            <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>ADDRESS</label>
            <input placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setCreateModalOpen(false)}>
          Cancel
        </Button>
        <Button
          color="green"
          content="Create"
          labelPosition="right"
          icon="check"
          onClick={() => {
            createStore();
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default CreateStoreModal;
