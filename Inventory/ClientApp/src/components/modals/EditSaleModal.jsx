import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import axios from "axios";

const EditSaleModal = (props) => {
  const { editModalOpen, setEditModalOpen, refreshData, sale, customers, products, stores  } = props;
  const [productId, setProductId] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [storeId, setStoreId] = useState(0);
  const [dateSold, setDateSold] = useState(0);

  useEffect(() => {
    setProductId(sale.productId);
    setCustomerId(sale.customerId);
    setStoreId(sale.storeId);
    setDateSold(new Date(sale.dateSold).toISOString().substr(0,10));
  }, [editModalOpen]);

  const editSale = () => {
    axios
      .put(`/api/Sales/${sale.id}`, {
        id: sale.id,
        productId: productId,
        customerId: customerId,
        storeId: storeId,
        dateSold: dateSold,
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
      <Modal.Header>Edit Sale</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field
            label="Date sold"
            control="input"
            type="date"
            value={dateSold}
            onChange={(e) => setDateSold(e.target.value)}
            required
          />

          <Form.Field
            label="Customer"
            control="select"
            value={sale.customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          >
            <option key="0" value="">
              -select customer-
            </option>
            {customers.map((c) => (
              <option key={c.id} value={c.id} >
                {c.name}
              </option>
            ))}
          </Form.Field>
          <Form.Field
            label="Product"
            control="select"
            value={sale.productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          >
            <option key="0" value="">
              -select product-
            </option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Form.Field>
          <Form.Field
            label="Store"
            control="select"
            value={sale.storeId}
            onChange={(e) => setStoreId(e.target.value)}
            required
          >
            <option key="0" value="">
              -select store-
            </option>
            {stores.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
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
            editSale();
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default EditSaleModal;
