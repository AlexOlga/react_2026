import { pageStyles } from '../shared/styles/page';
import { NotFoundPage } from '../shared/text';

const NotFound = () => {
  return (
    <div className={pageStyles.container} data-testid="not-found">
      <p className={pageStyles.text}>
        {NotFoundPage.text}
        <a href="/" className={pageStyles.link}>
          {NotFoundPage.link}
        </a>
      </p>
    </div>
  );
};
export default NotFound;
