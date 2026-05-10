import React from 'react';
import Card from './card';
import type { Pokemon } from '../types/pokemon';
import NotFound from './notFound';

export default class CardList extends React.Component<{ list: Pokemon[] }> {
  render() {
    const { list } = this.props;
    return (
      <>
        {list.length === 0 ? (
          <NotFound />
        ) : (
          <ul className="flex gap-4 item-center justify-center flex-wrap p-4 m-0 list-none">
            {list.map((item) => (
              <li key={item.id}>
                <Card {...item} />
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
/*
<ul className="flex gap-4 item-center justify-center flex-wrap p-4">
        {list.map((item) => (
          <li key={item.id}>
            <Card {...item} />
          </li>
        ))}
      </ul>
*/
