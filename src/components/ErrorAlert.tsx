import React from 'react';

class ErrorAlert extends React.Component<{ message: string }> {
  render() {
    const { message } = this.props;
    return (
      <div className="flex justify-center item-center p-4">
        <h3 className=" text-xxl text-center">{message}</h3>
      </div>
    );
  }
}
export default ErrorAlert;
