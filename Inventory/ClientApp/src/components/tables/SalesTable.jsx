import React, { Fragment, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Icon, Menu, Table, Button } from "semantic-ui-react";
import Moment from 'react-moment';
import DeleteModal from "../modals/DeleteModal";
import EditSaleModal from "../modals/EditSaleModal";
import DataTableCustomStyle from "../DataTableCustomStyle";

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

  const columns = [
    {
      name: "Customer",
      cell: (row) => row.customer.name,
      sortable: true,
    },
    {
      name: "Product",
      cell: (row) => row.product.name,
      sortable: true,
    },
    {
      name: "Store",
      cell: (row) => row.store.name,
      sortable: true,
    },
    {
      name: "Date sold",
      cell: (row) => <Moment format="D MMM, YYYY">{row.dateSold}</Moment>,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Button
          content="Edit"
          icon="edit"
          color="yellow"
          onClick={() => {
            setCurrSale(row);
            setEditModalOpen(true);
          }}
        />
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <Button
          content="Delete"
          icon="trash alternate"
          color="red"
          onClick={() => {
            setCurrSale(row);
            setDeleteModalOpen(true);
          }}
        />
      ),
    },
  ];

  return (
    <Fragment>
      <DataTable
        columns={columns}
        data={sales}
        pagination={true}
        striped={true}
        customStyles={DataTableCustomStyle}
      />

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
