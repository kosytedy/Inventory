import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Icon, Menu, Table, Button } from "semantic-ui-react";
import DeleteModal from "../modals/DeleteModal";
import EditSaleModal from '../modals/EditSaleModal';

const SalesTable = (props) => {
  const { sales, refreshData, customers, products, stores } = props;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [currSale, setCurrSale] = useState({
    id: 0,
    productId: 0,
    customerId: 0,
    storeId: 0,
    dateSold: null,
  });

  const deleteSale = (id) => {
    axios
      .delete(`/api/Sales/${id}`)
      .then((res) => {
        console.log(res);
        refreshData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Store</Table.HeaderCell>
            <Table.HeaderCell>Date Sold</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sales.map((s) => (
            <Table.Row key={s.id}>
              <Table.Cell>{s.customer.name}</Table.Cell>
              <Table.Cell>{s.product.name}</Table.Cell>
              <Table.Cell>{s.store.name}</Table.Cell>
              <Table.Cell>
                {new Intl.DateTimeFormat("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(s.dateSold)))}
              </Table.Cell>
              <Table.Cell>
                <Button
                  content="Edit"
                  icon="edit"
                  color="yellow"
                  onClick={() => {
                    setCurrSale(s);
                    setEditModalOpen(true);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <Button
                  content="Delete"
                  icon="trash alternate"
                  color="red"
                  onClick={() => {
                    setCurrSale(s);
                    setDeleteModalOpen(true);
                  }}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="6">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>

      <DeleteModal
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        deleteAction={deleteSale}
        actionId={currSale.id}
        actionName="Sale"
      />
      <EditSaleModal
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen}
        sale={currSale}
        refreshData={refreshData}
        customers={customers}
        products={products}
        stores={stores}
      />
    </Fragment>
  );
};

export default SalesTable;
