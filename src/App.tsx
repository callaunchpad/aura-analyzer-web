import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import NavBar from './components/NavBar';
import About from './pages/About';
import Results from './pages/Results';
import Home from './pages/Home';
import { DefaultApi, Configuration, AuraRequest, AuraRequestDepartmentEnum, AuraRequestColorSeasonEnum } from './client';

const config = new Configuration({
  basePath: 'http://localhost:8000',
});

const apiClient = new DefaultApi(config);

function App() {
  const [imgSrc, setImgSrc] = useState('');
  const [redboxImgSrc, setRedboxImgSrc] = useState('');
  const [correctedImgSrc, setCorrectedImgSrc] = useState('');
  const [croppedImgSrc, setCroppedImgSrc] = useState('');
  const [paletteImgSrc, setPaletteImgSrc] = useState('');
  const [seasonSrc, setSeasonSrc] = useState('');
  // const [colors, setColors] = useState([]);
  // const [cszn, setCszn] = useState([]);
  const [dept, setDept] = useState([]);
  const [url, setUrl] = useState([]);
  // const [master, setMaster] = useState([]);
  // const [product, setProduct] = useState([]);
  // const [size, setSize] = useState([]);
  // const [sub, setSub] = useState([]);
  const [female, setFemale] = useState(true);
  
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setImgSrc(event.target.result);
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

        const auraRequest: AuraRequest = {
          Department:female ? (AuraRequestDepartmentEnum.Womenswear) : (AuraRequestDepartmentEnum.Menswear),
        ColorSeason: season,
        n: 1, // Optional
      };

      const generateOutfitResponse = await apiClient.generateOutfitGenerateOutfitPost(auraRequest);
      console.log(generateOutfitResponse.data)
      // const extractColor = generateOutfitResponse.data.map((row: { Color: any; }[]) => row[0]?.Color || null);
      // setColors(extractColor);
      // const extractColorSeason = generateOutfitResponse.data.map((row: { ColorSeason: any; }[]) => row[0]?.ColorSeason || null);
      // setCszn(extractColorSeason);
      const extractDepartment = generateOutfitResponse.data.map((row: { Department: any; }[]) => row[0]?.Department || null);
      setDept(extractDepartment);
      const extractItemUrl = generateOutfitResponse.data.map((row: { ItemUrl: any; }[]) => row[0]?.ItemUrl || null);
      setUrl(extractItemUrl);
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
      console.log(generateOutfitResponse.data);
      setSeasonSrc(auraRequest.ColorSeason);
    }
  };

  const handleDepartmentToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      console.log('Womenswear');
      setFemale(true);
    } else {
      console.log('Menswear');
      setFemale(false);
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
              <div className="toggle-container">
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
                <label htmlFor="fileInput" className="file-input-label">
                  {/* style={{height:"150px", width: "200px", padding: '3.2em'} */}
                  choose image to analyze
                </label>
                <input type="file" id="fileInput" accept="image/*" onChange={handleChange} />
                <button type="submit" className="auralyze">Analyze</button>
              </form>
              {imgSrc && <img id="uploadedImage" alt="Uploaded Preview" src={imgSrc} style={{maxWidth: '500px', maxHeight: '700px', padding: '3.2em'}} />}
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
                {/* {url.map((item, i) => (
              (female && item==='womenswear' || !female && item==='meanswear' ? (
                <div key={i}>
                  <img src={item} alt={`Image ${i}`} style={{ maxWidth: '500px', maxHeight: '700px', padding: '3.2em' }} />
                </div>
                ) : (null))
                ))   
                } */}

                {/* {colors.map((item, i) => (
                  <div key={i}>
                  <p> Color: {colors[i]} </p>
                  <p> Color Season: {cszn[i]} </p>
                  <p> Department: {dept[i]} </p>
                  <p> ItemUrl: {url[i]} </p>
                  <p> Master Category: {master[i]} </p>
                  <p> Product Display Name: {product[i]} </p>
                  <p> Size: {size[i]} </p>
                  <p> Sub Category: {sub[i]} </p>
                  <img src={url[i]} alt={`Image ${i}`} style={{maxWidth: '500px', maxHeight: '700px', padding: '3.2em'}} />
                  <hr></hr>
                  </div>
                ))} */}
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
        ur={url} />}/>
      </Routes>
    </Router>
  );
}

export default App;
