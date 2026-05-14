import { aboutPage } from '../shared/text';

const About = () => {
  return (
    <div>
      <h2>{aboutPage.title}</h2>
      <p>
        {aboutPage.text1}
        <a href={aboutPage.linkUrl}>{aboutPage.linkText}</a>
        {aboutPage.text2}
      </p>
    </div>
  );
};

export default About;
