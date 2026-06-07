type GenderProps = {
  id: string;
  error?: string;
};

const GenderPicker = ({ id, error, ...props }: GenderProps) => {
  return (
    <div>
      <label htmlFor="gender" className="mr-5">
        Gender
      </label>
      <select
        id={id}
        name="gender"
        className="border-solid rounded-xs outline-none bg-cyan-50"
        {...props}
      >
        <option value="">Select gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <div className="text-red-500 my-2">{error ?? '\u00A0'}</div>
    </div>
  );
};
export default GenderPicker;
