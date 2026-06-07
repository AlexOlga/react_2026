import Card from '../Card';
import type { User } from '../../types/User';

type Props = {
  list: User[];
};

const CardList = ({ list }: Props) => {

  return (
    <>
      
        <ul className="flex gap-4 item-center justify-center flex-wrap p-4 m-0 list-none">
          {list.map((item, index) => (
            <li key={index}>             
                <Card {...item} />            
            </li>
          ))}
        </ul>
   
    </>
  );
};

export default CardList;