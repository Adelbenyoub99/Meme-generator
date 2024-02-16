const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const app = express();
const port = 5000;
// Charger les informations de configuration Cloudinary depuis le fichier JSON
const cloudinaryConfig = JSON.parse(fs.readFileSync('cloudinary_config.json'));

cloudinary.config(cloudinaryConfig);

app.use(cors());
app.use(express.json());

// Vérifier si le répertoire d'uploads existe, sinon le créer
const uploadDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const fileName=file.originalname;
    cb(null, fileName);
  }
});
const upload = multer({ storage: storage });
let db = []; // Structure de données pour stocker les informations sur les mèmes téléchargés

// Route pour télécharger l'image
app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Aucune image téléchargée' });
  }
  const options = {
    folder: 'memes',
    use_filename: true,
    unique_filename: true,
    overwrite: true,
  };
  const tempImageUrl = path.join(__dirname, 'uploads', req.file.filename);

  try {
    const cloudinaryResponse=await cloudinary.uploader.upload(tempImageUrl,options)
    fs.rm(tempImageUrl,err=>{console.error(err)})
    res.json({ message: 'Image uploaded successfully', imageUrl: cloudinaryResponse.url, id:cloudinaryResponse.public_id});

  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Internal server error' });

  }
});

// Route pour enregistrer les mèmes partagés
app.post('/sharedImages', upload.single('image'), async (req, res) => {
  const options = {
    folder: 'memesShared',
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  const tempImageUrl = path.join(__dirname, 'uploads', req.file.filename);
  try {
    const cloudinaryResponse=await cloudinary.uploader.upload(tempImageUrl,options)
    fs.rm(tempImageUrl,err=>{console.error(err)})
    res.json({ message: 'Image uploaded successfully', imageUrl: cloudinaryResponse.url, id:cloudinaryResponse.public_id});
    
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Internal server error' });
    
  }
});

// Route pour obtenir la liste des mèmes
app.get('/memes',async (req, res) => {
  db=[];
  const results=await cloudinary.search
  .expression('folder:memes')
  .execute()
  results.resources.forEach(resource=>{
    
    db.push({ imageUrl: resource.url });
  })

  res.json(db);
});

// Serveur statique pour servir les images
app.use('/uploads', express.static('uploads'));

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
