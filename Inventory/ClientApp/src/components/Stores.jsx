import React, { Component, Fragment } from 'react';
import StoreTable from './tables/StoreTable';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import CreateStoreModal from './modals/CreateStoreModal';

class Stores extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            stores: [],
            loading: true,
            createModalOpen: false
        }
    }

    componentDidMount(){
        this.getStores();
    }

    render() { 
        const { stores, loading, createModalOpen } = this.state;
        const tableData = (loading) 
            ? <div>Fetching stores</div> 
            : <StoreTable stores={stores} refreshData={this.getStores} />;

        return (  
            <Fragment>
                <h3>Stores</h3>
                <Button content='New Store' onClick={() => this.setState({createModalOpen:true})} icon='plus' labelPosition='left' primary />
                { tableData }
                <CreateStoreModal createModalOpen={createModalOpen} setCreateModalOpen={(toggle) => this.setState({createModalOpen:toggle})} refreshData={this.getStores} createAction={this.createStore} />
            </Fragment>
        );
    }

    getStores = () => {
        axios.get('/api/Stores')
            .then(({data}) => {
                this.setState({
                    stores: data,
                    loading: false,
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    
}

export default Stores;