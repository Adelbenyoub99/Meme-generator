import React, { useState, useEffect } from 'react';
import './css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageUploadForm from './components/ImageUploadForm';
import TextEditor from './components/TextEditor';
import MemePreview from './components/MemePreview';
import MemeGallery from './components/MemeGallery';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [textColor, setTextColor] = useState('#ffffff');
  const [textSize, setTextSize] = useState(36);
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    try {
      const response = await fetch('http://localhost:5000/memes');
      const data = await response.json();
      setMemes(data);
    } catch (error) {
      console.error('Error fetching memes:', error);
    }
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
    uploadImage(event.target.files[0]);
  };

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleTopTextChange = (event) => {
    setTopText(event.target.value);
  };

  const handleBottomTextChange = (event) => {
    setBottomText(event.target.value);
  };

  const handleTextColorChange = (event) => {
    setTextColor(event.target.value);
  };

  const handleTextSizeChange = (event) => {
    setTextSize(event.target.value);
  };

  const handleMemeSelect = (meme) => {
    setTopText(meme.topText);
    setBottomText(meme.bottomText);
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
              />
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <MemeGallery memes={memes} onSelect={handleMemeSelect} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
