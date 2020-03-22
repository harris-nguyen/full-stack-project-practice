import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch('/api/products/1')
      .then(res => res.json())
      .then(result => {
        this.setState({
          products: result
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.props.product) {
      return (
        <div className="container">
          <div
            onClick={() =>
              this.props.setView('catalog', { })
            }
          >Back to Catalog</div>
          <div className="row">
            <div className="col-4">
              <img
                src={this.props.image}
                className="card-img-top"
                alt={this.props.name}
              />
            </div>

            <div className="col-8">
              <div>Title</div>
              <div>price</div>
              <div>Short info</div>
            </div>
          </div>

          <div>
              Im a big believer in winging it. Im a big believer that youre
              never going to find a perfect city travel experience or the
              perfect meal without a constant willingness to experience a bad
              one. Letting the happy accident happen is what a lot of vacation
              itineraries miss, I think, and m always trying to push people to
              allow those things to happen rather than stick to some rigid
              itinerary
          </div>
        </div>
      );
    } else {
      return null;
    }

  }
}
