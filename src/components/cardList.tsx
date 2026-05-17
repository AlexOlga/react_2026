import Card from './card';
import type { Pokemon } from '../types/pokemon';
import { errorMessages } from '../shared/text';
import { Link, useSearchParams } from 'react-router';

type Props = {
  list: Pokemon[];
};

const CardList = ({ list }: Props) => {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  return (
    <>
      {list.length === 0 ? (
        <p data-testid="not-found">{errorMessages.notFound}</p>
      ) : (
        <ul className="flex gap-4 item-center justify-center flex-wrap p-4 m-0 list-none">
          {list.map((item) => (
            <li key={item.id}>
              <Link to={`/details/${item.id}?page=${currentPage}`}>
                <Card {...item} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CardList;
