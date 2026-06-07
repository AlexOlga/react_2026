import type { User } from '../../types/User';

const Card = (data: User) => {
  return (
    <div className={'w-40 h-40 p-5  border-solid border-2 rounded-xl ' + (data.isNew ? 'border-red-300' :'') }>
      <h3>{data.name}</h3>
      <p>
        <span>{data.gender}</span> {data.age} years
      </p>
      <p>Country: {data.country}</p>
      <p>Email: {data.email}</p>
    </div>
  );
};

export default Card;
