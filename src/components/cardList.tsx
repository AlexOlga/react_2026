import Card from './card';
import type { Pokemon } from '../types/pokemon';
import NotFound from './notFound';

type Props = {
  list: Pokemon[];
};

const CardList = ({ list }: Props) => {
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
};

export default CardList;
