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
}

const Results: React.FC<ResultsProps> = ({ imgSrc, cor, rd, crop, pal, szn, ur }) => {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>aura analyzer</h1>
      <div className={styles.content}>
        <div className = "imm">
            <img src={imgSrc} alt="Uploaded Preview" style={{maxWidth: '500px', maxHeight: '700px', padding: '3.2em'}} />
            <img src={cor} alt="Corrected Preview" style={{maxWidth: '500px', maxHeight: '700px', padding: '3.2em'}}/>
            <img src={rd} alt="Redbox Preview" style={{maxWidth: '500px', maxHeight: '700px', padding: '3.2em'}} />
            <img src={crop} alt="Cropped Preview" style={{maxWidth: '500px', maxHeight: '700px', padding: '3.2em'}} />
            <img src={pal} alt="Palette" style={{maxWidth: '500px', maxHeight: '700px', padding: '3.2em'}} />
            <h1> your season is {szn}! </h1>
            <div className='notwhite'>
                {ur.map((item: string | undefined, i: Key | null | undefined) => (
                <div key={i}>
                <img src={item} alt={`Image ${i}`} style={{maxWidth: '500px', maxHeight: '700px', padding: '3.2em'}} />
                </div>
                ))}
             </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
