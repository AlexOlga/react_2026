import { Link } from 'react-router';
import { pageStyles } from '../../shared/styles/page';
import { NotFoundPage } from '../../shared/text';

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
