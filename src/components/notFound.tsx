import React from 'react';
const urlImg = '/not-found.png';
const altImg = 'not-found';
export default class NotFound extends React.Component {
  render() {
    return (
      <div className="flex item-center justify-center">
        <img className="w-4/5 object-cover" src={urlImg} alt={altImg} />
      </div>
    );
  }
}
