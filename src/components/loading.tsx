import React from 'react';
import Spiner from './spiner';

export default class Loading extends React.Component {
  render() {
    return (
      <div className="flex item-center justify-center">
        <Spiner />
      </div>
    );
  }
}
