import React, { useState, useEffect } from 'react';
import './css/styles.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ImageUploadForm from './components/ImageUploadForm';
import TextEditor from './components/TextEditor';
import MemePreview from './components/MemePreview';
import MemeGallery from './components/MemeGallery';

function App() {
  // Utilisation des hooks d'état pour gérer les données de l'application
  const [selectedImage, setSelectedImage] = useState(null); 
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [textColor, setTextColor] = useState('#ffffff');
  const [textSize, setTextSize] = useState(36);
  const [memes, setMemes] = useState([]);

  // Utilisation de useEffect pour récupération des mèmes après le premier rendu
  useEffect(() => {
    fetchMemes();
  }, []);

  // Fonction pour récupérer la liste des mèmes depuis le serveur
  const fetchMemes = async () => {
    try {
      const response = await fetch('http://localhost:5000/memes'); // Requête GET
      const data = await response.json();
      setMemes(data); 
    } catch (error) {
      console.error('Error fetching memes:', error);
    }
  };

  // Fonction pour gérer le changement de l'image sélectionnée
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  // Fonction pour gérer le changement du texte supérieur
  const handleTopTextChange = (event) => {
    setTopText(event.target.value);
  };

  // Fonction pour gérer le changement du texte inférieur
  const handleBottomTextChange = (event) => {
    setBottomText(event.target.value);
  };

  // Fonction pour gérer le changement de la couleur du texte
  const handleTextColorChange = (event) => {
    setTextColor(event.target.value);
  };

  // Fonction pour gérer le changement de la taille du texte
  const handleTextSizeChange = (event) => {
    setTextSize(event.target.value);
  };

  return (
    <div className="App">
      <h1>Générateur de mèmes</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <ImageUploadForm onImageChange={handleImageChange} />
            <TextEditor
              onTopTextChange={handleTopTextChange}
              onBottomTextChange={handleBottomTextChange}
              onTextColorChange={handleTextColorChange}
              onTextSizeChange={handleTextSizeChange}
            /> 
          </div>
          <div className="col-md-6">
            {selectedImage && (
              <MemePreview
                imageUrl={URL.createObjectURL(selectedImage)}
                topText={topText}
                bottomText={bottomText}
                textColor={textColor}
                textSize={textSize}
                selectedImage={selectedImage}
              />
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <MemeGallery memes={memes}/> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
