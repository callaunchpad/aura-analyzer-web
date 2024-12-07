import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>aura analyzer</h1>
      <div className={styles.content}>
        
        <p>
          aura analyzer is a revolutionary color analysis model designed to classify users
          into distinct seasonal color categories based on their unique tone and color profile. 
          using advanced algorithms and a deep understanding of color theory, aura analyzer takes 
          a user inputted image and classifies the user into one of four seasonal categories—winter, spring, 
          summer, or autumn—each with its own color palette that compliments the natural color profile of the user.
        </p>
        <p>
        whether you're looking to enhance your wardrobe, improve your makeup choices, or simply understand
         your innate color energy, aura analyzer offers a personalized, insightful approach to color that goes
          beyond just appearance. embrace your season and tone, and let the colors that align with your aura empower you.
        </p>
      </div>
      <div className={styles.facesGrid}>
        <div className={styles.facesRow}>
          <div>
            <img src="jade.png" className={styles.roundImage} alt="Jade" />
            <p className={styles.faceName}>jade</p>
          </div>
          <div>
            <img src="kathryn.png" className={styles.roundImage} alt="Kathryn" />
            <p className={styles.faceName}>kathryn</p>
          </div>
          <div>
            <img src="anaisha.png" className={styles.roundImage} alt="Anaisha" />
            <p className={styles.faceName}>anaisha</p>
          </div>
          <div>
            <img src="andrea.png" className={styles.roundImage} alt="Andrea" />
            <p className={styles.faceName}>andrea</p>
          </div>
          <div>
            <img src="seb.png" className={styles.roundImage} alt="Seb" />
            <p className={styles.faceName}>sebastian</p>
          </div>
        </div>
        <div className={styles.facesRow}>
          <div>
            <img src="spencer.png" className={styles.roundImage} alt="Spencer" />
            <p className={styles.faceName}>spencer</p>
          </div>
          <div>
            <img src="sophie.png" className={styles.roundImage} alt="Sophie" />
            <p className={styles.faceName}>sophie</p>
          </div>
          <div>
            <img src="mischa.png" className={styles.roundImage} alt="Mischa" />
            <p className={styles.faceName}>mischa</p>
          </div>
          <div>
            <img src="iris.png" className={styles.roundImage} alt="Iris" />
            <p className={styles.faceName}>iris</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
