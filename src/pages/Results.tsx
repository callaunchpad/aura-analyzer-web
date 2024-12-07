import { Key } from 'react';
import styles from './Results.module.css';

interface ResultsProps {
    imgSrc: string;
    cor: string;
    rd: string;
    crop: string;
    pal: string;
    szn: string;
    ur: string[];
    rtg: boolean;
}

const Results: React.FC<ResultsProps> = ({ imgSrc, cor, rd, crop, pal, szn, ur, rtg }) => {
  return (
    
    <div className={styles.resultContainer}>
      <h1 className={styles.title}>aura analyzer</h1>
      <div className={styles.content}>
          {rtg ? (
            <div>
            <p style = {{fontWeight:'bold', paddingBottom:'0.25em'}}> your season is {szn}! </p>
            <div className = 'sidebyside imim'> 
            <p> this is you: </p>
              <img src={imgSrc} alt="Uploaded Preview"/>
              <p> and you after color correction: </p>
              <img src={cor} alt="Corrected Preview"/>
              <p> then you with your features identified: </p>
              <img src={rd} alt="Redbox Preview"/>
              <p> then just your cropped face: </p>
              <img src={crop} alt="Cropped Preview"/>
              <p> these are your colors: </p>
              <img src={pal} alt="Palette Preview" className = 'smol'/>
              {/* style={{padding: '3.2em', scale:'0.4', display: 'inline-block'}} */}
            {/* <img src={imgSrc} alt="Uploaded Preview" style={{maxWidth: '800px', height: 'auto', padding: '3.2em', display: 'inline-block', margin: '0 auto'}}/>
            <img src={cor} alt="Corrected Preview" style={{maxWidth: '800px', height: 'auto', padding: '3.2em', display: 'inline-block', margin: '0 auto'}}/>
            <img src={rd} alt="Redbox Preview" style={{maxWidth: '500px', height: 'auto', padding: '3.2em', display: 'grid', margin: '0 auto'}}  />
            <img src={crop} alt="Cropped Preview" style={{maxWidth: '800px', height: 'auto', padding: '3.2em', display: 'inline-block', margin: '0 auto'}}  />
            <img src={pal} alt="Palette" style={{maxWidth: '800px', height: 'auto', padding: '3.2em', display: 'inline-block', margin: '0 auto'}}  /> */}
            <p style = {{fontWeight:'bold'}}> here's an outfit for you to try! </p>
                {ur.map((item: string | undefined, i: Key | null | undefined) => (
                <div key={i}>
                <img src={item} alt={`Image ${i}`} style={{maxWidth: '320px'}} />
                </div>
                ))}
            </div>
             </div>
          ) : (
            <p>waiting...</p>
          )}
        </div>
    </div>
  );
};

export default Results;
