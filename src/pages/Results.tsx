import styles from './Results.module.css';

interface ResultsProps {
    imgSrc: string;
    setImgSrc: React.Dispatch<React.SetStateAction<string>>;
}

const Results: React.FC<ResultsProps> = ({imgSrc, setImgSrc}) => {
    // const updateImage = () => {
    //     setImgSrc();
    // };
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>aura analyzer</h1>
      <div className={styles.content}>
        
        <div className = "imm">
            <img src={imgSrc} alt="Uploaded Preview" style={{maxWidth: '500px', maxHeight: '700px', padding: '3.2em'}} />
        </div>
      </div>
    </div>
  );
};

export default Results;
