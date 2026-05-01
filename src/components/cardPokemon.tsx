import React from 'react';
import type { Pokemon } from '../types/pokemon';
const placeholderURL = '/pokemon-placeholder.png';

export default class Card extends React.Component<Pokemon> {
  constructor(props: Pokemon) {
    super(props);
    this.getImg = this.getImg.bind(this);
  }
  getImg(): string {
    return this.props.sprites?.back_default
      ? this.props.sprites.back_default
      : placeholderURL;
  }
  render() {
    return (
      <div className="grid grid-cols-3 bg-white rounded-lg p-2 shadow">
        <img src={this.getImg()} alt={this.props.name} />
        <span>{this.props.name}</span>
        <span>{this.props.types[0].type.name || ''}</span>
      </div>
    );
  }
}
