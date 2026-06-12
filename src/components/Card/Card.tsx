import type { User } from '../../types/User';
import avatarImg from '../../assets/images.png';
import { memo } from 'react';
const Card = (data: User) => { 
  return (
    <div
      className={
        'w-80 h-80 p-5  border-solid border-2 rounded-xl ' +
        (data.isNew ? 'border-red-300' : '')
      }
      data-testid="user-card"
    >
      <h3>{data.name}</h3>
      <p>
        <span>{data.gender}</span> {data.age} years
      </p>
      <img
        src={data.img || avatarImg}
        alt="preview"
        className="w-32 h-32 object-cover rounded-lg mt-2 my-0 mx-auto"
      />
      <p>Country: {data.country}</p>
      <p>Email: {data.email}</p>
    </div>
  );
};

export default memo(Card);
