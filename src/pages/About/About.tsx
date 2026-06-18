import { pageStyles } from '../../../pokemon-next/shared/styles/page';
import { aboutPage } from '../../../pokemon-next/shared/text';

const About = () => {
  return (
    <div className={pageStyles.container}>
      <h2 className={pageStyles.title}>{aboutPage.title}</h2>
      <p className={pageStyles.text}>
        {aboutPage.text1}
        <a
          href={aboutPage.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={pageStyles.link}
        >
          {aboutPage.linkText}
        </a>
        {aboutPage.text2}
      </p>
    </div>
  );
};

export default About;
