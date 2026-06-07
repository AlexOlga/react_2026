import type { User } from '../../types/User';

const Card = (data: User) => {
  return (
    <div>
      <h3>{data.name}</h3>
      <p>
        <span>{data.gender}</span> {data.age} years
      </p>
      <p>{data.country}</p>
      <p>{data.email}</p>
    </div>
  );
};

export default Card;
