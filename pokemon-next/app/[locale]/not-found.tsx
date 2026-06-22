import { Link } from '@/i18n/navigation';
import { pageStyles } from '@/shared/styles/page';
import { getTranslations } from 'next-intl/server';

const NotFound = async () => {
  const t = await getTranslations('not found');
  return (
    <div className={pageStyles.container} data-testid="not-found">
      <p className={pageStyles.text}>
        {t('text')}
        <Link href="/" className={pageStyles.link}>
          {t('link')}
        </Link>
      </p>
    </div>
  );
};
export default NotFound;
