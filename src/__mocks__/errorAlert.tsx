type ErrorMockProps = {
  message: string;
};
export default function ErrorAlertMock(props: ErrorMockProps) {
  const { message } = props;
  return <div>{message}</div>;
}
