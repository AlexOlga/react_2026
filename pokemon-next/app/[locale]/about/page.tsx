import { Link } from "@/i18n/navigation";
import { pageStyles } from "@/shared/styles/page";
import { aboutPage } from "@/shared/text";


const About = () => {
  return (
    <div className={pageStyles.container}>
      <h2 className={pageStyles.title}>{aboutPage.title}</h2>
      <p className={pageStyles.text}>
        {aboutPage.text1}
        <Link
          href={aboutPage.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={pageStyles.link}          
        >
          {aboutPage.linkText}
        </Link>
        {aboutPage.text2}
      </p>
    </div>
  );
};

export default About;
