import React from 'react';
import '../css/styles.css';

function TextEditor(props) {
  return (
    <div className='TextEditor'>
      <h2>Ajouter du texte</h2>
      <input type="text" placeholder="Saisissez le texte du haut" onChange={props.onTopTextChange} />
      <input type="text" placeholder="Saisissez le texte du bas" onChange={props.onBottomTextChange} />
      <p>Couleur :</p>
      <input type="color" onChange={props.onTextColorChange} />
      <p>Taille :</p>
      <input type="number" min="10" max="100" step="5" onChange={props.onTextSizeChange} />
    </div>
  );
}

export default TextEditor;
