import React, { Component, Fragment } from 'react';
import CustomerTable from './tables/CustomerTable';
import axios from 'axios';
import { Button } from 'semantic-ui-react'

class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            customers: [],
            loading: true,
        }
    }

    componentDidMount(){
        this.getCustomers();
    }

    render() { 
        const { customers, loading } = this.state;
        const tableData = (loading) 
            ? <div>Fetching customers</div> 
            : <CustomerTable customers={customers} />;
            
        return (  
            <Fragment>
                <h3>Customers</h3>
                <Button content='New Customer' icon='plus' labelPosition='left' primary />
                { tableData }
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