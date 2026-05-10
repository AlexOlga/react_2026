import * as React from 'react';
import { TEXTS } from '../shared/text';
import { buttonStyles } from '../shared/styles/button';

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
    return (
      <div className="flex justify-center mt-4">
        <button
          className={`${buttonStyles.base} ${buttonStyles.red}`}
          onClick={this.addError}
        >
          {TEXTS.buggy.button}
        </button>
      </div>
    );
  }
}
export default BuggyButton;
