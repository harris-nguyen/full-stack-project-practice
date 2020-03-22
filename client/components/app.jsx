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
      view: { name: 'catalog', params: {} }
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data =>
        this.setState({ message: data.message || data.error })
      )
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  setView(name, params) {
    this.setState({ view: { name, params } });
  }

  render() {
    const view = this.state.view;
    if (view.name === 'catalog') {
      return (
        <div>
          <div>
            <Header text={'Stay ambitious.'} />
          </div>

          <div className=" backgroundGrey">
            <ProductList setView={this.setView} />
          </div>
        </div>
      );
    } else if (view.name === 'details') {
      return (
        <div>
          <div>
            <Header text={'Stay ambitious.'} />
          </div>

          <div className=" backgroundGrey">
            <ProductDetails setView={this.setView} product={view.params} />
          </div>
        </div>
      );
    }
  }
}
