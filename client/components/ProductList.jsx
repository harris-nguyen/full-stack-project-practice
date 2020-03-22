import React from 'react';
import ProductListItem from './ProductListItem';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(result => {
        this.setState({
          products: result
        });
      });

  }

  render() {
    const data = this.state.products.map((e, index) => {
      return (
        <ProductListItem
          key={index}
          productId={e.productId}
          name={e.name}
          price={(e.price / 100).toFixed(2)}
          image={e.image}
          shortDesc={e.shortDescription}
          setView={this.props.setView}
        />
      );
    });
    return (
      <div className="container ">
        <div className="row p-4">{data}</div>
      </div>
    );
  }
}
