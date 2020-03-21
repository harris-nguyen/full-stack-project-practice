import React from 'react';
import Header from './Header';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      }
    };
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    return (
      <div className="">
        <div>
          <Header text={'Stay ambitious.'} />
        </div>

        <div className=" backgroundGrey">
          <ProductList />
          <ProductDetails />
        </div>

      </div>
    );
  }
}
// this.state.isLoading
// return
//       ? <h1>{ this.state.message } </h1>
//       : <Header text={'Stay ambitious.'}/>;
