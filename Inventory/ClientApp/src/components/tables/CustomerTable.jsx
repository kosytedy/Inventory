import React from 'react';
import { Icon, Menu, Table, Button } from 'semantic-ui-react';

const CustomerTable = (props) => {

    const { customers } = props;

    return (
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
                                <Button content='Edit' icon='edit' color='yellow' />
                            </Table.Cell>
                            <Table.Cell>
                                <Button content='Delete' icon='trash alternate' color='red' />
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
    );
  
}

export default CustomerTable