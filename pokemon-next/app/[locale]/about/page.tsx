import { Link } from '@/i18n/navigation';
import { pageStyles } from '@/shared/styles/page';
import { aboutPage } from '@/shared/text';
import { getTranslations } from 'next-intl/server';

const About = async () => {
  const t = await getTranslations('about'); 
  return (
    <div className={pageStyles.container}>
      <h2 className={pageStyles.title}>{t('title')}</h2>
     
      <p className={pageStyles.text}>
        {t('text1')}
        <Link
          href={aboutPage.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={pageStyles.link}
        >
          {t('linkText')}
        </Link>
        {t('text2')}
      </p>
    </div>
  );
};

export default About;
