import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
  placeholder?: string;
  ref: React.RefObject<HTMLInputElement | null>;
};
const InputFile = ({
  id,
  label,
  error,
  ref,
  placeholder,

  ...props
}: InputProps) => {
  return (
    <div>
      <label htmlFor={id} className="mr-5">
        {label}
      </label>

      <input
        ref={ref}
        id={id}
        name={id}
        placeholder={placeholder}
        type="file"
        accept="image/png,image/jpeg"
        className="border-solid rounded-xs outline-none bg-cyan-50"
        {...props}
      />
      <div className="text-red-500 my-1 text-xs">{error ?? '\u00A0'}</div>
    </div>
  );
};
export default InputFile;
