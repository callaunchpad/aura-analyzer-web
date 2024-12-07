import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, SetStateAction } from "react";
import NavBar from './components/NavBar';
import About from './pages/About';
import Results from './pages/Results';
import { DefaultApi, Configuration, AuraRequest, AuraRequestDepartmentEnum, AuraRequestColorSeasonEnum } from './client';

const config = new Configuration({
  basePath: 'http://localhost:8000', // Set the correct API base URL
});

const apiClient = new DefaultApi(config);

function App() {
  const [imgSrc, setImgSrc] = useState('');
  const [redboxImgSrc, setRedboxImgSrc] = useState('');
  const [correctedImgSrc, setCorrectedImgSrc] = useState('');
  const [croppedImgSrc, setCroppedImgSrc] = useState('');
  const [paletteImgSrc, setPaletteImgSrc] = useState('');
  const [seasonSrc, setSeasonSrc] = useState('');
  
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // navigate('/about')
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0]; // Get the uploaded file
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          console.log("DOG");
          setImgSrc(event.target.result); // Set the image source to display
        }
      };
      reader.readAsDataURL(file); // Read the file as a data URL

      // Aura analyze image: call POST endpoint
      const auraResponse = await apiClient.auraAnalyzeAuraAnalyzePost(file);
      const season: AuraRequestColorSeasonEnum = auraResponse.data;

      // Get redbox image
      const redboxImage = await apiClient.getRedboxAuraAnalyzeRedboxGet({
        responseType: 'arraybuffer',  // Set the responseType to 'arraybuffer' to handle binary data
      });
      const redboxImageBlob = new Blob([redboxImage.data], { type: 'image/jpeg' });
      const redboxImageUrl = URL.createObjectURL(redboxImageBlob);  
      setRedboxImgSrc(redboxImageUrl);

      // Get corrected image
      const correctedImage = await apiClient.getCorrectedAuraAnalyzeCorrectedGet({
        responseType: 'arraybuffer',  // Set the responseType to 'arraybuffer' to handle binary data
      });
      const correctedImageBlob = new Blob([correctedImage.data], { type: 'image/jpeg' });
      const correctedImageUrl = URL.createObjectURL(correctedImageBlob);  
      setCorrectedImgSrc(correctedImageUrl);

      // Get cropped image
      const croppedImage = await apiClient.getCroppedAuraAnalyzeCroppedGet({
        responseType: 'arraybuffer',  // Set the responseType to 'arraybuffer' to handle binary data
      });
      const croppedImageBlob = new Blob([croppedImage.data], { type: 'image/jpeg' });
      const croppedImageUrl = URL.createObjectURL(croppedImageBlob);  
      setCroppedImgSrc(croppedImageUrl);

      // To display, can do something similar to line 61 —> srcImgSrc(croppedImageUrl)

      // Get palette
      const palette = await apiClient.getPaletteAuraAnalyzePaletteGet({
        responseType: 'arraybuffer',  // Set the responseType to 'arraybuffer' to handle binary data
      });
      const paletteBlob = new Blob([palette.data], { type: 'image/jpeg' });
      const paletteImageUrl = URL.createObjectURL(paletteBlob);  
      setPaletteImgSrc(paletteImageUrl);

      // Get palette
      const auraRequest: AuraRequest = {
        Department: AuraRequestDepartmentEnum.Menswear,
        ColorSeason: season,
        n: 1, // Optional
      };
      const generateOutfitResponse = await apiClient.generateOutfitGenerateOutfitPost(auraRequest);
      console.log(generateOutfitResponse.data)
      setSeasonSrc(auraRequest.ColorSeason);

    }
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <main style={{ paddingTop: '80px' }}>
            <h1 className = "textsss">aura analyzer</h1>
            <div className="card">
              <form id="uploadForm" className="up">
                <label htmlFor="fileInput" className="file-input-label">
                  {/* style={{height:"150px", width: "200px", padding: '3.2em'} */}
                  choose image to auralyze
                </label>
                <input type="file" id="fileInput" accept="image/*" onChange={handleChange}/>
                <button type="submit" className="auralyze">auralyze</button>
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
            </div>
          </main>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/results" element={<Results imgSrc={imgSrc} setImgSrc={setImgSrc}/>}/>
      </Routes>
    </Router>
  );
}

export default App