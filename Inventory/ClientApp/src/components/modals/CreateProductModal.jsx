import React, {useState} from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import axios from 'axios';

const CreateProductModal = (props) => {
  const { createModalOpen, setCreateModalOpen, refreshData } = props;
  const [name, setName] = useState();
  const [price, setPrice] = useState(0);

  const createProduct = () => {
    axios
        .post('/api/Products/', {
            name: name,
            price: parseFloat(price)
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
      <Modal.Header>Create Product</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>NAME</label>
            <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>PRICE</label>
            <input type="number" min="0.01" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
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
            createProduct();
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default CreateProductModal;
