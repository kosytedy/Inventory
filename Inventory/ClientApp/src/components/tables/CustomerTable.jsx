import React, { Fragment, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Button } from "semantic-ui-react";
import DeleteModal from "../modals/DeleteModal";
import EditCustomerModal from "../modals/EditCustomerModal";
import DataTableCustomStyle from "../DataTableCustomStyle";

const CustomerTable = (props) => {
  const { customers, refreshData } = props;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currCustomer, setCurrCustomer] = useState({
    id: 0,
    name: "",
    address: "",
  });

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Address",
      selector: "address",
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
            setCurrCustomer(row);
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
            setCurrCustomer(row);
            setDeleteModalOpen(true);
          }}
        />
      ),
    },
  ];

  const deleteCustomer = (id) => {
    axios
      .delete(`/api/Customers/${id}`)
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
      <DataTable
        columns={columns}
        data={customers}
        pagination={true}
        striped={true}
        customStyles={DataTableCustomStyle}
      />

      <DeleteModal
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        deleteAction={deleteCustomer}
        actionId={currCustomer.id}
        actionName="Customer"
      />
      <EditCustomerModal
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen}
        customer={currCustomer}
        refreshData={refreshData}
      />
    </Fragment>
  );
};

export default CustomerTable;
