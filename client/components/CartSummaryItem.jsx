import React from 'react';

export default class CartSummaryItem extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-4">
            <img
              src={this.props.image}
              className="card-img-top "
              alt={this.props.name}
            />
          </div>
          <div className="col-8 align-self-center">
            <div>{this.props.name}</div>
            <div className="text-muted">${this.props.price}</div>
            <div>{this.props.shortDesc}</div>
          </div>
        </div>
      </div>
    );
  }
}
