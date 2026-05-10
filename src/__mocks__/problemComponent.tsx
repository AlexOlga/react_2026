import * as React from 'react';
type ProblemChildState = {
  crash: boolean;
};
class ProblemChild extends React.Component<unknown, ProblemChildState> {
  constructor(props: unknown) {
    super(props);
    this.state = { crash: false };
  }
  render() {
    if (this.state.crash) {
      throw new Error('Test error');
    }

    return (
      <button onClick={() => this.setState({ crash: true })}>Crash</button>
    );
  }
}
export default ProblemChild;
