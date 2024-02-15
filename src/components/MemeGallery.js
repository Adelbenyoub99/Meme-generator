import React from 'react';
import '../css/styles.css';

function MemeGallery({ memes, onSelect }) {
  const handleClick = (meme) => {
    onSelect(meme);
  };

  return (
    <div className='MemeGallery'>
      <h2>Galerie de mèmes</h2>
      <ul>
        {memes.map((meme, index) => (
          <li key={index} onClick={() => handleClick(meme)}>
            <img src={meme.imageUrl} alt="Meme" />
            <p className="top-text">{meme.topText}</p>
            <p className="bottom-text">{meme.bottomText}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MemeGallery;
