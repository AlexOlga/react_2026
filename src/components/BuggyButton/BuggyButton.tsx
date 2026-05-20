import * as React from 'react';
import { TEXTS } from '../../shared/text';
import { buttonStyles } from '../../shared/styles/button';

const BuggyButton = () => {
  const [crash, setCrash] = React.useState<boolean>(false);
  if (crash) {
    throw new Error(TEXTS.buggy.error);
  }
  const handleCrash = () => setCrash(true);
  return (
    <div className="flex justify-center mt-4">
      <button
        className={`${buttonStyles.base} ${buttonStyles.red}`}
        onClick={handleCrash}
      >
        {TEXTS.buggy.button}
      </button>
    </div>
  );
};
export default BuggyButton;
