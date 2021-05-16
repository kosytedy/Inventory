import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Icon, Menu, Table, Button } from 'semantic-ui-react';
import DeleteModal from '../modals/DeleteModal';
import EditProductModal from '../modals/EditProductModal';

const ProductTable = (props) => {

    const { products, refreshData } = props;
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currProduct, setCurrProduct] = useState({
        id: 0,
        name: "",
        price: 0
    });

    const deleteProduct = (id) => {
        axios.delete(`/api/Products/${id}`)
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
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        products.map((p) => (
                            <Table.Row key={p.id}>
                                <Table.Cell>{ p.name }</Table.Cell>
                                <Table.Cell>{ p.price }</Table.Cell>
                                <Table.Cell>
                                    <Button content='Edit' icon='edit' color='yellow' onClick={() => {setCurrProduct(p); setEditModalOpen(true)}}/>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button content='Delete' icon='trash alternate' color='red' onClick={() => { setCurrProduct(p); setDeleteModalOpen(true)}} />
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
            
            <DeleteModal deleteModalOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} deleteAction={deleteProduct} actionId={currProduct.id} />
            <EditProductModal editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} customer={currProduct} refreshData={refreshData} />
        </Fragment>
    );
  
}

export default ProductTable