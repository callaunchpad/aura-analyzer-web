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
      <div className={styles.facesGrid}>
        <div className={styles.facesRow}>
          <img src="jade.png" className={styles.roundImage} alt="Jade" />
          <img src="kathryn.png" className={styles.roundImage} alt="Kathryn" />
          <img src="anaisha.png" className={styles.roundImage} alt="Anaisha" />
          <img src="andrea.png" className={styles.roundImage} alt="Andrea" />
          <img src="seb.png" className={styles.roundImage} alt="Seb" />
        </div>
        <div className={styles.facesRow}>
          <img src="spencer.png" className={styles.roundImage} alt="Spencer" />
          <img src="sophie.png" className={styles.roundImage} alt="Sophie" />
          <img src="mischa.png" className={styles.roundImage} alt="Mischa" />
          <img src="iris.png" className={styles.roundImage} alt="Iris" />
        </div>
      </div>
    </div>
  );
};

export default About;
