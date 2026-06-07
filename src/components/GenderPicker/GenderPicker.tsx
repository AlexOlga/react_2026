import type { ChangeEventHandler } from 'react';

type GenderProps = {
  id: string;  
  error?: string;
  onChange?: ChangeEventHandler;
};

const GenderPicker = ({id,error}:  GenderProps)=>{
    return(
        <div>
  <label htmlFor="gender" className="mr-5">Gender</label>

  <select id={id} name="gender"  className="border-solid rounded-xs outline-none bg-cyan-50">
    <option value="">Select gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>

  <div className="text-red-500 my-2">{error ?? '\u00A0'}</div>
</div>
    )
}
export  default GenderPicker