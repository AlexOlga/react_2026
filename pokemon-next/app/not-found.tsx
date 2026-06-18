import { pageStyles } from '../shared/styles/page';
import { NotFoundPage } from '..//shared/text';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className={pageStyles.container} data-testid="not-found">
      <p className={pageStyles.text}>
        {NotFoundPage.text}
        <Link href="/" className={pageStyles.link}>
          {NotFoundPage.link}
        </Link>
      </p>
    </div>
  );
};
export default NotFound;