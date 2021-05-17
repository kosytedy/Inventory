import React, { Fragment, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Button } from 'semantic-ui-react';
import DeleteModal from '../modals/DeleteModal';
import EditStoreModal from '../modals/EditStoreModal';
import DataTableCustomStyle from '../DataTableCustomStyle';

const StoreTable = (props) => {

    const { stores, refreshData } = props;
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currStore, setCurrStore] = useState({
        id: 0,
        name: "",
        address: ""
    });

    const deleteStore = (id) => {
        axios.delete(`/api/Stores/${id}`)
            .then((res) => {
                console.log(res);
                refreshData();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const columns = [
        {
          name: 'Name',
          selector: 'name',
          sortable: true,
        },
        {
          name: 'Address',
          selector: 'address',
          sortable: true,
        },
        {
            name: 'Actions',
            cell: row => <Button content='Edit' icon='edit' color='yellow' onClick={() => {setCurrStore(row); setEditModalOpen(true)}}/>
          },
          {
            name: 'Actions',
            cell: row => <Button content='Delete' icon='trash alternate' color='red' onClick={() => { setCurrStore(row); setDeleteModalOpen(true)}} />
          },
      ];

    return (
        <Fragment>
            <DataTable
        columns={columns}
        data={stores}
        pagination={true}
        striped={true}
        customStyles={DataTableCustomStyle}
      />
            
            <DeleteModal deleteModalOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} deleteAction={deleteStore} actionId={currStore.id} actionName="Store" />
            <EditStoreModal editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} store={currStore} refreshData={refreshData} />
        </Fragment>
    );
  
}

export default StoreTable