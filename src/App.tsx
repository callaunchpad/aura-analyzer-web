import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from "react";
import NavBar from './components/NavBar';
import About from './pages/About';
import Results from './pages/Results';
import { DefaultApi, Configuration, AuraRequest, AuraRequestDepartmentEnum, AuraRequestColorSeasonEnum } from './client';

const config = new Configuration({
  basePath: 'https://web-aura-analyzer-g7cpc5cgb4gchka9.canadacentral-01.azurewebsites.net/',
});
/* 
https://web-aura-analyzer-g7cpc5cgb4gchka9.canadacentral-01.azurewebsites.net/
web-aura-analyzer-g7cpc5cgb4gchka9.canadacentral-01.azurewebsites.net
'http://localhost:8000',
*/
const apiClient = new DefaultApi(config);

function App() {
  const [imgSrc, setImgSrc] = useState('');
  const [redboxImgSrc, setRedboxImgSrc] = useState('');
  const [correctedImgSrc, setCorrectedImgSrc] = useState('');
  const [croppedImgSrc, setCroppedImgSrc] = useState('');
  const [paletteImgSrc, setPaletteImgSrc] = useState('');
  const [seasonSrc, setSeasonSrc] = useState('');
  const [readyToGo, setReadyToGo] = useState(false);
  // const [colors, setColors] = useState([]);
  // const [cszn, setCszn] = useState([]);
  // const [dept, setDept] = useState([]);
  // const [url, setUrl] = useState([]);
  // const [master, setMaster] = useState([]);
  // const [product, setProduct] = useState([]);
  // const [size, setSize] = useState([]);
  // const [sub, setSub] = useState([]);
  const [female, setFemale] = useState(true);
  const [imgTaken, setImgTaken] = useState(false);
  const [menImgs, setMenImgs] = useState([]);
  const [womenImgs, setWomenImgs] = useState([]);
  const [resultImgs, setResultImgs] = useState([]); // depending on men or women button, displays the outfit
  
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    // takes an image
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setImgSrc(event.target.result);
          setImgTaken(true);
          console.log("Setting image and handling change...")
        }
      };
      reader.readAsDataURL(file);

      const auraResponse = await apiClient.auraAnalyzeAuraAnalyzePost(file);
      const season: AuraRequestColorSeasonEnum = auraResponse.data;

      const redboxImage = await apiClient.getRedboxAuraAnalyzeRedboxGet({
        responseType: 'arraybuffer',
      });
      const redboxImageBlob = new Blob([redboxImage.data], { type: 'image/jpeg' });
      const redboxImageUrl = URL.createObjectURL(redboxImageBlob);  
      setRedboxImgSrc(redboxImageUrl);

      const correctedImage = await apiClient.getCorrectedAuraAnalyzeCorrectedGet({
        responseType: 'arraybuffer',
      });
      const correctedImageBlob = new Blob([correctedImage.data], { type: 'image/jpeg' });
      const correctedImageUrl = URL.createObjectURL(correctedImageBlob);  
      setCorrectedImgSrc(correctedImageUrl);

      const croppedImage = await apiClient.getCroppedAuraAnalyzeCroppedGet({
        responseType: 'arraybuffer',
      });
      const croppedImageBlob = new Blob([croppedImage.data], { type: 'image/jpeg' });
      const croppedImageUrl = URL.createObjectURL(croppedImageBlob);  
      setCroppedImgSrc(croppedImageUrl);

      const palette = await apiClient.getPaletteAuraAnalyzePaletteGet({
        responseType: 'arraybuffer',
      });
      const paletteBlob = new Blob([palette.data], { type: 'image/jpeg' });
      const paletteImageUrl = URL.createObjectURL(paletteBlob);  
      setPaletteImgSrc(paletteImageUrl);

      //   const auraRequest: AuraRequest = {
      //     Department:female ? (AuraRequestDepartmentEnum.Womenswear) : (AuraRequestDepartmentEnum.Menswear),
      //   ColorSeason: season,
      //   n: 1, // Optional
      // };

      const femaleAR: AuraRequest = {
        Department: AuraRequestDepartmentEnum.Womenswear, ColorSeason: season, n:1,
      };
      const maleAR: AuraRequest = {
        Department: AuraRequestDepartmentEnum.Menswear, ColorSeason: season, n:1,
      };

      // pregenerates outfit for men/women so no recomputing

      const mOutfitResponse = await apiClient.generateOutfitGenerateOutfitPost(maleAR);
      const wOutfitResponse = await apiClient.generateOutfitGenerateOutfitPost(femaleAR);
      // const generateOutfitResponse = await apiClient.generateOutfitGenerateOutfitPost(auraRequest);
      // generateOutfitResponse.data)
      // const extractColor = generateOutfitResponse.data.map((row: { Color: any; }[]) => row[0]?.Color || null);
      // setColors(extractColor);
      // const extractColorSeason = generateOutfitResponse.data.map((row: { ColorSeason: any; }[]) => row[0]?.ColorSeason || null);
      // setCszn(extractColorSeason);
      // const extractDepartment = generateOutfitResponse.data.map((row: { Department: any; }[]) => row[0]?.Department || null);
      // setDept(extractDepartment);
      // const extractItemUrl = generateOutfitResponse.data.map((row: { ItemUrl: any; }[]) => row[0]?.ItemUrl || null);
      // setUrl(extractItemUrl);
      const extractMenItemUrl = mOutfitResponse.data.map((row: { ItemUrl: any; }[]) => row[0]?.ItemUrl || null);
      setMenImgs(extractMenItemUrl);
      const extractWomenItemUrl = wOutfitResponse.data.map((row: { ItemUrl: any; }[]) => row[0]?.ItemUrl || null);
      setWomenImgs(extractWomenItemUrl);
      if (female) {
        setResultImgs(extractWomenItemUrl);
        console.log(wOutfitResponse.data);
        setSeasonSrc(femaleAR.ColorSeason);
        wOutfitResponse.data ? setReadyToGo(true) : setReadyToGo(false);
      } else {
        setResultImgs(extractMenItemUrl);
        console.log(mOutfitResponse.data);
        setSeasonSrc(maleAR.ColorSeason);
        mOutfitResponse.data ? setReadyToGo(true) : setReadyToGo(false);
      }
      // const extractMasterCategory = generateOutfitResponse.data.map((row: { MasterCategory: any; }[]) => row[0]?.MasterCategory || null);
      // setMaster(extractMasterCategory);
      // const extractProductDisplayName = generateOutfitResponse.data.map((row: { ProductDisplayName: any; }[]) => row[0]?.ProductDisplayName || null);
      // setProduct(extractProductDisplayName);
      // const extractSize = generateOutfitResponse.data.map((row: { Size: any; }[]) => row[0]?.Size || null);
      // setSize(extractSize);
      // const extractSubCategory = generateOutfitResponse.data.map((row: { SubCategory: any; }[]) => row[0]?.SubCategory || null);
      // setSub(extractSubCategory);

      // console.log(generateOutfitResponse.data[0][0].Color)
      // console.log(generateOutfitResponse.data[1][0].Color)

      /*ColorSeason
        Department
        ItemUrl
        MasterCategory
        ProductDisplayName
        Size
        SubCategory*/
      console.log("BOTTOM OF HANDLE CHANGE. Ready to go: ", readyToGo);
    }
  };

  const resetButton = () => {
    setReadyToGo(false);
    setImgTaken(false);
    console.log("reset");
  }

  const handleDepartmentToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Handling department toggle...");
    const isChecked = e.target.checked;
    if (isChecked) {
      console.log('Womenswear');
      setFemale(true);
      setResultImgs(womenImgs) ;

    } else {
      console.log('Menswear');
      setFemale(false);
      setResultImgs(menImgs);
    }
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <main style={{ paddingTop: '80px' }}>
            <h1 className="textsss">Aura Analyzer</h1>
            <div className="card">
              <div className="toggle-container cen">
                <label className="toggle">
                    <input
                    type="checkbox"
                    checked={female}
                    onChange={handleDepartmentToggle}
                  />
                    <span className="toggle-slider"></span> 
                      <span className="toggle-label">
                    {female ? 'Womenswear' : 'Menswear' }
                      </span> 
                </label>
              </div>
              <form id="uploadForm" className="up">
                <label htmlFor="fileInput" className="file-input-label cen">
                  {/* style={{height:"150px", width: "200px", padding: '3.2em'} */}
                  choose image to auralyze
                </label>
                <input type="file" id="fileInput" accept="image/*" onChange={handleChange} />
              </form>
              <div>
              </div>
              <div>
                {imgTaken ? (<div>
                  {readyToGo ? (
                      <div className='cen'>
                          <Link to="/results"> 
                          <button type="submit" className="auralyze">
                            <label htmlFor="button" className="link-label"> 
                              auralyze
                              </label>
                            </button>
                        </Link>
                        
                        <button type="submit" className="auralyze" onClick={resetButton}>reset</button>
                          {/* {imgSrc && <img id="uploadedImage" alt="Uploaded Preview" src={imgSrc} style={{maxWidth: '500px', maxHeight: '700px', padding: '3.2em'}} />}
                        {correctedImgSrc && <img id="corrected" alt="Corrected Preview" src={correctedImgSrc} style={{maxWidth: '500px', maxHeight: '700px', padding: '3.2em'}}/>}
                        {redboxImgSrc && <img id="redbox" alt="Redbox Preview" src={redboxImgSrc} style={{maxWidth: '500px', maxHeight: '700px', padding: '3.2em'}} />}
                        {croppedImgSrc && <img id="cropped" alt="Cropped Preview" src={croppedImgSrc} style={{maxWidth: '500px', maxHeight: '700px', padding: '3.2em'}} />}
                        {paletteImgSrc && <img id="palette" alt="Palette" src={paletteImgSrc} style={{maxWidth: '500px', maxHeight: '700px', padding: '3.2em'}} />}
                          <div className='notwhite'>
                            {seasonSrc ? (
                              <p> {seasonSrc} </p>
                            ) : (
                              <p>waiting...</p>
                            )}
                          </div>
                          <div className ='notwhite'>
                          {url.map((item, i) => (
                          <div key={i}>
                            <img src={item} alt={`Image ${i}`} style={{ maxWidth: '500px', maxHeight: '700px', padding: '3.2em' }} />
                          </div>
                          ))   
                          }
                          </div> */}
                      </div>
                    ) : (<div className='notwhite iliketext'> <p>waiting...</p> </div>)
                    // this is where you put the loading
                    }

                </div>) : (null)}
              </div>
            </div>
          </main>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/results" element={<Results 
        imgSrc={imgSrc} 
        cor={correctedImgSrc} 
        rd={redboxImgSrc} 
        crop={croppedImgSrc} 
        pal={paletteImgSrc} 
        szn={seasonSrc} 
        ur={resultImgs} // instead of url
        rtg={readyToGo}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
