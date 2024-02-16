import React from 'react';
import '../css/styles.css';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MemePreview(props) {
  const uploadImage = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  const handleDownloadClick = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      // Dessine l'image sur le canevas
      ctx.drawImage(image, 0, 0);

      // Ajout du texte sur l'image
      ctx.fillStyle = props.textColor;
      ctx.font = `${props.textSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillText(props.topText, canvas.width / 2, 40);
      ctx.fillText(props.bottomText, canvas.width / 2, canvas.height - 20);

      // Canevas en blob
      canvas.toBlob(blob => {
        // Crée un lien de téléchargement
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = props.selectedImage.name;
        const formData=new FormData();
        const image = new File([blob], props.selectedImage.name, {type: 'image/png'});
        formData.append('image',image);
        uploadImage(formData);
        // Déclenche le téléchargement
        link.click();
      }, 'image/png');
    };
    // Charge l'image
    image.src = props.imageUrl;
  };

  const shareOnFacebook = async () => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = async () => {
        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0);
  
        ctx.fillStyle = props.textColor;
        ctx.font = `${props.textSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(props.topText, canvas.width / 2, 40);
        ctx.fillText(props.bottomText, canvas.width / 2, canvas.height - 20);
  

        canvas.toBlob(async (blob) => {

          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = props.selectedImage.name;
          const formData = new FormData();
          const imageFile = new File([blob], props.selectedImage.name, { type: 'image/png' });
          formData.append('image', imageFile);
          // Télécharger l'image et récupérez l'URL
          const {imageUrl} = await shareImage(formData);
          // Générer l'URL Facebook et ouvrez une nouvelle fenêtre
          const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${imageUrl}`;
          window.open(facebookUrl, '_blank');
        }, 'image/png');
      };
  
      image.src = props.imageUrl;
    } catch (error) {
      console.error('Error sharing on Facebook:', error);
    }
  };

  const shareImage = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/sharedImages', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className='MemePreview'>
      <h2>Aperçu du mème</h2>
      <div>
        <img src={props.imageUrl} alt='Meme' />
        <p className='top-text' style={{ color: props.textColor, fontSize: props.textSize + 'px' }}>
          {props.topText}
        </p>
        <p className='bottom-text' style={{ color: props.textColor, fontSize: props.textSize + 'px' }}>
          {props.bottomText}
        </p>
      </div>
      <button className='telecharger' onClick={handleDownloadClick}>
        <FontAwesomeIcon icon={faDownload} />
      </button>
      <button className='fbpartage' onClick={shareOnFacebook}>
        <FontAwesomeIcon icon={faFacebook} />
      </button>
    </div>
  );
}

export default MemePreview;
