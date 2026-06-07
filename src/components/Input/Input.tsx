import type { ChangeEventHandler } from 'react';

type InputProps = {
  id: string;
  label: string;
  error?: string;
  placeholder?: string;
  type: string;
  onChange?: ChangeEventHandler;
};

const Input = ({
  id,
  label,
  error,
  placeholder,
  type,
  onChange,
  ...props
}: InputProps) => {
  return (
    <div>
      <label htmlFor={id} className="mr-5">
        {label}
      </label>

      <input
        id={id}
        name={id}
        placeholder={placeholder}
        type={type}
        className="border-solid rounded-xs outline-none bg-cyan-50"
        onChange={onChange}
        {...props}
      />

      <div className="text-red-500 my-2">{error ?? '\u00A0'}</div>
    </div>
  );
};
export default Input;
