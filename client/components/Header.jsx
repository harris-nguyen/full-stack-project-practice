import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <div className="row navbar navbar-dark bg-dark whiteFont">
          <div className="col-8">{this.props.text}</div>
          <div className="col-2 cartItemSize">
            {this.props.cartItemCount.length} item(s)
            <div className="fas fa-shopping-cart"></div>
          </div>
        </div>
      </div>
    );
  }
}
