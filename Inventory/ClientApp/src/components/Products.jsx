import React, { Component, Fragment } from 'react';
import ProductTable from './tables/ProductTable';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import CreateProductModal from './modals/CreateProductModal';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            products: [],
            loading: true,
            createModalOpen: false
        }
    }

    componentDidMount(){
        this.getProducts();
    }

    render() { 
        const { products, loading, createModalOpen } = this.state;
        const tableData = (loading) 
            ? <div>Fetching products</div> 
            : <ProductTable products={products} refreshData={this.getProducts} />;

        return (  
            <Fragment>
                <h3>Products</h3>
                <Button content='New Product' onClick={() => this.setState({createModalOpen:true})} icon='plus' labelPosition='left' primary />
                { tableData }
                <CreateProductModal createModalOpen={createModalOpen} setCreateModalOpen={(toggle) => this.setState({createModalOpen:toggle})} refreshData={this.getProducts} createAction={this.createProduct} />
            </Fragment>
        );
    }

    getProducts = () => {
        axios.get('/api/Products')
            .then(({data}) => {
                this.setState({
                    products: data,
                    loading: false,
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    
}

export default Products;