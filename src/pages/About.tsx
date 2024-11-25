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
      <div>
  <img src="jadeface.png" className={styles.roundImage} style={{ position: 'absolute', left: '90px', bottom: '50px' }} />
</div>

<div>
  <img src="kathryn.png" className={styles.roundImage} style={{ position: 'absolute', left: '230px', bottom: '50px' }} />
</div>

<div>
  <img src="anaisha.png" className={styles.roundImage} style={{ position: 'absolute', left: '370px', bottom: '50px' }} />
</div>

<div>
  <img src="andrea.png" className={styles.roundImage} style={{ position: 'absolute', left: '510px', bottom: '50px' }} />
</div>

<div>
  <img src="seb.png" className={styles.roundImage} style={{ position: 'absolute', left: '650px', bottom: '50px' }} />
</div>

<div>
  <img src="spencer.png" className={styles.roundImage} style={{ position: 'absolute', left: '790px', bottom: '50px' }} />
</div>

<div>
  <img src="sophie.png" className={styles.roundImage} style={{ position: 'absolute', left: '930px', bottom: '50px' }} />
</div>

<div>
  <img src="mischa.png" className={styles.roundImage} style={{ position: 'absolute', left: '1070px', bottom: '50px' }} />
</div>

<div>
  <img src="iris.png" className={styles.roundImage} style={{ position: 'absolute', left: '1210px', bottom: '50px' }} />
</div>


    </div>
  );
};

export default About;
