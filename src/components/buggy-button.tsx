import * as React from 'react';
import { TEXTS } from '../shared/text';
type BuggyState = {
  crash: boolean;
};

class BuggyButton extends React.Component<unknown, BuggyState> {
  constructor(props: unknown) {
    super(props);
    this.state = { crash: false };
    this.addError = this.addError.bind(this);
  }
  addError() {
    this.setState({ crash: true });
  }
  render() {
    if (this.state.crash) {
      throw new Error(TEXTS.buggy.error);
    }
    return <button onClick={this.addError}>{TEXTS.buggy.button}</button>;
  }
}
export default BuggyButton;
