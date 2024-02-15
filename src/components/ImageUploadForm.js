import React from 'react';
import '../css/styles.css';

function ImageUploadForm(props) {
  return (
    <div className='ImageUploadForm'>
      <h2>Importer une image</h2>
      <input type="file" onChange={props.onImageChange} />
    </div>
  );
}

export default ImageUploadForm;