import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>aura analyzer</h1>
      <div className={styles.content}>
        <p>
          aura analyzer is an innovative tool that helps you understand the emotional
          and energetic qualities captured in your photos. using advanced facial
          detection and analysis, we reveal the subtle energies and auras present
          in your images.
        </p>
        <p>
          our technology combines modern computer vision with traditional aura
          interpretation techniques to provide you with unique insights about the
          energy fields present in your photographs.
        </p>
      </div>
    </div>
  );
};

export default About;
