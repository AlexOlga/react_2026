import { Link } from '@/i18n/navigation';
import { pageStyles } from '@/shared/styles/page';

const NotFound = async () => {
  return (
    <div className={pageStyles.container} data-testid="not-found">
      <p className={pageStyles.text}>
        <Link href="/" className={pageStyles.link}>
          Not found
        </Link>
      </p>
    </div>
  );
};
export default NotFound;
