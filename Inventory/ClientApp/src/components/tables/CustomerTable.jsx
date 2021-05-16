import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Icon, Menu, Table, Button } from 'semantic-ui-react';
import DeleteModal from '../modals/DeleteModal';
import EditCustomerModal from '../modals/EditCustomerModal';

const CustomerTable = (props) => {

    const { customers, refreshData } = props;
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currCustomer, setCurrCustomer] = useState({
        id: 0,
        name: "",
        address: ""
    });

    const deleteCustomer = (id) => {
        axios.delete(`/api/Customers/${id}`)
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
                        customers.map((c) => (
                            <Table.Row key={c.id}>
                                <Table.Cell>{ c.name }</Table.Cell>
                                <Table.Cell>{ c.address }</Table.Cell>
                                <Table.Cell>
                                    <Button content='Edit' icon='edit' color='yellow' onClick={() => {setCurrCustomer(c); setEditModalOpen(true)}}/>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button content='Delete' icon='trash alternate' color='red' onClick={() => { setCurrCustomer(c); setDeleteModalOpen(true)}} />
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
            
            <DeleteModal deleteModalOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} deleteAction={deleteCustomer} actionId={currCustomer.id} actionName="Customer" />
            <EditCustomerModal editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} customer={currCustomer} refreshData={refreshData} />
        </Fragment>
    );
  
}

export default CustomerTable