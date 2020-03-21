import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <div className="row navbar navbar-dark bg-dark whiteFont">
          <div className="col">{this.props.text}</div>
          <div className="col"></div>
          <div className="col"></div>
        </div>
      </div>
    );
  }
}
