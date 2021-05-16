import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Icon, Menu, Table, Button } from 'semantic-ui-react';
import DeleteModal from '../modals/DeleteModal';
import EditStoreModal from '../modals/EditStoreModal';

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

    return (
        <Fragment>
            <Table celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Address</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        stores.map((s) => (
                            <Table.Row key={s.id}>
                                <Table.Cell>{ s.name }</Table.Cell>
                                <Table.Cell>{ s.address }</Table.Cell>
                                <Table.Cell>
                                    <Button content='Edit' icon='edit' color='yellow' onClick={() => {setCurrStore(s); setEditModalOpen(true)}}/>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button content='Delete' icon='trash alternate' color='red' onClick={() => { setCurrStore(s); setDeleteModalOpen(true)}} />
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>

                <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='4'>
                    <Menu floated='right' pagination>
                        <Menu.Item as='a' icon>
                        <Icon name='chevron left' />
                        </Menu.Item>
                        <Menu.Item as='a'>1</Menu.Item>
                        <Menu.Item as='a'>2</Menu.Item>
                        <Menu.Item as='a'>3</Menu.Item>
                        <Menu.Item as='a'>4</Menu.Item>
                        <Menu.Item as='a' icon>
                        <Icon name='chevron right' />
                        </Menu.Item>
                    </Menu>
                    </Table.HeaderCell>
                </Table.Row>
                </Table.Footer>
            </Table>
            
            <DeleteModal deleteModalOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} deleteAction={deleteStore} actionId={currStore.id} actionName="Store" />
            <EditStoreModal editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} store={currStore} refreshData={refreshData} />
        </Fragment>
    );
  
}

export default StoreTable