import React, { Component, Fragment } from "react";
import SalesTable from "./tables/SalesTable";
import axios from "axios";
import { Button } from "semantic-ui-react";
import CreateSaleModal from "./modals/CreateSaleModal";

class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
      loading: true,
      customers: [],
      products: [],
      stores: [],
      createModalOpen: false,
    };
  }

  componentDidMount() {
    this.getSales();
    this.getCustomers();
    this.getProducts();
    this.getStores();
  }

  render() {
    const { sales, loading, createModalOpen, customers, products, stores } = this.state;
    const tableData = loading ? (
      <div>Fetching sales</div>
    ) : (
      <SalesTable
        sales={sales}
        refreshData={this.getSales}
        customers={customers}
        products={products}
        stores={stores}
      />
    );

    return (
      <Fragment>
        <h3>Sales</h3>
        <Button
          content="New Sales"
          onClick={() => this.setState({ createModalOpen: true })}
          icon="plus"
          labelPosition="left"
          primary
        />
        {tableData}
        <CreateSaleModal
          createModalOpen={createModalOpen}
          setCreateModalOpen={(toggle) =>
            this.setState({ createModalOpen: toggle })
          }
          refreshData={this.getSales}
          createAction={this.createSales}
          customers={customers}
          products={products}
          stores={stores}
        />
      </Fragment>
    );
  }

  getSales = () => {
    axios
      .get("/api/Sales")
      .then(({ data }) => {
        this.setState({
          sales: data,
          loading: false,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getCustomers = () => {
    axios
      .get("/api/Customers")
      .then(({ data }) => {
        this.setState({ customers: data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getProducts = () => {
    axios
      .get("/api/Products")
      .then(({ data }) => {
        this.setState({ products: data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getStores = () => {
    axios
      .get("/api/Stores")
      .then(({ data }) => {
        this.setState({ stores: data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export default Sales;
