import { Link } from 'react-router';
import { pageStyles } from '../../../pokemon-next/shared/styles/page';
import { NotFoundPage } from '../../../pokemon-next/shared/text';

const NotFound = () => {
  return (
    <div className={pageStyles.container} data-testid="not-found">
      <p className={pageStyles.text}>
        {NotFoundPage.text}
        <Link to="/" className={pageStyles.link}>
          {NotFoundPage.link}
        </Link>
      </p>
    </div>
  );
};
export default NotFound;
