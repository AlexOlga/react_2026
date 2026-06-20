import Card from '../Card';
import type { Pokemon } from '../../types/pokemon';
import { errorMessages } from '../../shared/text';
import Link from 'next/link';

type Props = {
  list: Pokemon[];
  currentPage: number;
};
const CardList = ({ list, currentPage }: Props) => {
  return (
    <>
      {list.length === 0 ? (
        <p data-testid="not-found">{errorMessages.notFound}</p>
      ) : (
        <ul className="flex gap-4 item-center justify-center flex-wrap p-4 m-0 list-none">
          {list.map((item) => (
            <li key={item.id}>
              <Link
                href={{
                  pathname: '/',
                  query: {
                    cardId: item.id,
                    page: currentPage,
                  },
                }}
              >
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
