import React from 'react';
import type { Pokemon } from '../types/pokemon';
import { cardStyles } from '../shared/styles/card-pokemon';
import { placeholderURL } from '../constant/global';

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
      <div className={cardStyles.card}>
        <img
          className={cardStyles.img}
          src={this.getImg()}
          alt={this.props.name}
        />
        <h3 className={cardStyles.title}>{this.props.name}</h3>
        <p className={cardStyles.text}>{this.props.types[0].type.name || ''}</p>
      </div>
    );
  }
}
