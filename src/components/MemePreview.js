import React from 'react';
import '../css/styles.css';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MemePreview(props) {
  const handleDownloadClick = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      // Dessinez l'image sur le canevas
      ctx.drawImage(image, 0, 0);

      // Ajoutez du texte sur l'image
      ctx.fillStyle = props.textColor;
      ctx.font = `${props.textSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillText(props.topText, canvas.width / 2, 40);
      ctx.fillText(props.bottomText, canvas.width / 2, canvas.height - 20);

      // Convertir le canevas en blob
      canvas.toBlob(blob => {
        // Créez un lien de téléchargement
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'meme.png';

        // Cliquez sur le lien pour déclencher le téléchargement
        link.click();
      }, 'image/png');
    };

    // Chargez l'image
    image.src = props.imageUrl;
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      'URL_DE_VOTRE_SITE_WEB'
    )}&picture=${encodeURIComponent(props.imageUrl)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      props.imageUrl
    )}&text=${encodeURIComponent(props.topText + ' ' + props.bottomText)}`;
    window.open(twitterUrl, '_blank');
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
      <button className='xpartage' onClick={shareOnTwitter}>
        <FontAwesomeIcon icon={faTwitter} />
      </button>
    </div>
  );
}

export default MemePreview;
