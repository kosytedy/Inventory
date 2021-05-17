import React, { useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import axios from "axios";

const CreateSaleModal = (props) => {
  const { createModalOpen, setCreateModalOpen, refreshData, customers, products, stores } = props;
  const [productId, setproductId] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [storeId, setStoreId] = useState(0);
  const [dateSold, setDateSold] = useState(0);

  const createSale = () => {
    axios
      .post("/api/Sales/", {
        productId: productId,
        customerId: customerId,
        storeId: storeId,
        dateSold: dateSold,
      })
      .then((res) => {
        console.log(res);
        refreshData();
        setCreateModalOpen(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Modal
      size="mini"
      dimmer="blurring"
      onClose={() => setCreateModalOpen(false)}
      onOpen={() => setCreateModalOpen(true)}
      open={createModalOpen}
    >
      <Modal.Header>Create Sale</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field
            label="Date sold"
            control="input"
            type="date"
            onChange={(e) => setDateSold(e.target.value)}
            required
          />

          <Form.Field label="Customer" control="select" onChange={(e) => setCustomerId(e.target.value)} required>
          <option key="0" value="">-select customer-</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </Form.Field>
          <Form.Field label="Product" control="select" onChange={(e) => setproductId(e.target.value)} required>
          <option key="0" value="">-select product-</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </Form.Field>
          <Form.Field label="Store" control="select" onChange={(e) => setStoreId(e.target.value)} required>
          <option key="0" value="">-select store-</option>
            {stores.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
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
            createSale();
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default CreateSaleModal;
