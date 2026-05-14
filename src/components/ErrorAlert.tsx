type Props = { message: string };
const ErrorAlert = ({ message }: Props) => {
  return (
    <div className="flex justify-center item-center p-4">
      <h3 className=" text-xxl text-center">{message}</h3>
    </div>
  );
};

export default ErrorAlert;
