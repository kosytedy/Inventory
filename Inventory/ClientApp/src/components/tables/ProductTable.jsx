import React, { Fragment, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Button } from "semantic-ui-react";
import DeleteModal from "../modals/DeleteModal";
import EditProductModal from "../modals/EditProductModal";
import DataTableCustomStyle from "../DataTableCustomStyle";

const ProductTable = (props) => {
  const { products, refreshData } = props;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currProduct, setCurrProduct] = useState({
    id: 0,
    name: "",
    price: 0,
  });

  const deleteProduct = (id) => {
    axios
      .delete(`/api/Products/${id}`)
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
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Price",
      selector: "price",
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
            setCurrProduct(row);
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
            setCurrProduct(row);
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
        data={products}
        pagination={true}
        striped={true}
        customStyles={DataTableCustomStyle}
      />
      <DeleteModal
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        deleteAction={deleteProduct}
        actionId={currProduct.id}
        actionName="Product"
      />
      <EditProductModal
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen}
        customer={currProduct}
        refreshData={refreshData}
      />
    </Fragment>
  );
};

export default ProductTable;
