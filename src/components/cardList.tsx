import React from 'react';
import Card from './card';
import type { Pokemon } from '../types/pokemon';
import NotFound from './notFound';

export default class CardList extends React.Component<{ list: Pokemon[] }> {
  render() {
    const { list } = this.props;
    return (
      <div className="flex gap-4 item-center justify-center flex-wrap p-4">
        {list.length === 0 ? (
          <NotFound />
        ) : (
          list.map((item) => <Card key={item.id} {...item} />)
        )}
      </div>
    );
  }
}
