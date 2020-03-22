import React from 'react';
import CartSummaryItem from './CartSummaryItem';

export default class CartSummary extends React.Component {
  render() {
    const data = this.props.cartItemCount;
    return (
      <div className="container">
        <div
          className="text-muted"
          onClick={() => this.props.setView('catalog', {})}
        >
          &lt; Back to Catalog
        </div>

        <h2>My Cart</h2>

        <div>
          {data.length === 0 ? (
            <h1>Cart Empty</h1>
          ) : (
            data.map((e, index) => {
              return (
                <CartSummaryItem
                  key={index}
                  name={e.name}
                  shortDesc={e.shortDescription}
                  price={e.price}
                  image={e.image}
                />
              );
            })
          )}
        </div>

        <div>
          Total Cost $
          {(data.reduce((a, b) => +a + +b.price, 0) / 100).toFixed(2)}
        </div>
      </div>
    );
  }
}
