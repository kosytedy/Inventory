import React, { Component, Fragment } from 'react';
import CustomerTable from './tables/CustomerTable';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import CreateCustomerModal from './modals/CreateCustomerModal';

class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            customers: [],
            loading: true,
            createModalOpen: false
        }
    }

    componentDidMount(){
        this.getCustomers();
    }

    render() { 
        const { customers, loading, createModalOpen } = this.state;
        const tableData = (loading) 
            ? <div>Fetching customers</div> 
            : <CustomerTable customers={customers} refreshData={this.getCustomers} />;

        return (  
            <Fragment>
                <h3>Customers</h3>
                <Button content='New Customer' onClick={() => this.setState({createModalOpen:true})} icon='plus' labelPosition='left' primary />
                { tableData }
                <CreateCustomerModal createModalOpen={createModalOpen} setCreateModalOpen={(toggle) => this.setState({createModalOpen:toggle})} refreshData={this.getCustomers} createAction={this.createCustomer} />
            </Fragment>
        );
    }

    getCustomers = () => {
        axios.get('/api/Customers')
            .then(({data}) => {
                this.setState({
                    customers: data,
                    loading: false,
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    
}

export default Customers;