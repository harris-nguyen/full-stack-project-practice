import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    const id = this.props.product.productId;
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          product: result
        });
      }) // eslint-disable-next-line no-console
      .catch(err => console.err(err));
  }

  render() {
    const data = this.state.product;
    if (this.state.product) {
      return (
        <div className="container">
          <div onClick={() => this.props.setView('catalog', {})}>
            &lt; Back to Catalog
          </div>
          <div className="row">
            <div className="col-4">
              <img src={data.image} className="card-img-top" alt={data.name} />
            </div>

            <div className="col-8">
              <div>{data.name}</div>
              <div className="text-muted">${(data.price / 100).toFixed(2)}</div>
              <div>{this.state.product.shortDescription}</div>
            </div>
          </div>

          <div>{data.longDescription}</div>
        </div>
      );
    } else {
      return null;
    }
  }
}
