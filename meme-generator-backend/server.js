const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

const app = express();
const port = 5000;

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
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

const db = []; // Structure de données pour stocker les informations sur les mèmes téléchargés

// Route pour télécharger l'image
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Aucune image téléchargée' });
  }
  const imageUrl = `http://localhost:${port}/uploads/${req.file.filename}`;
  db.push({ imageUrl: imageUrl, filename: req.file.filename }); // Ajoutez les informations sur le mème à la base de données
  res.json({ message: 'Image uploaded successfully', imageUrl: imageUrl });
});

// Route pour stocker l'image avec le texte ajouté
app.post('/store', async (req, res) => {
  const { imageUrl, topText, bottomText, textColor, textSize } = req.body;

  try {
    // Charger l'image téléchargée
    const image = await loadImage(imageUrl);

    // Créer un nouveau canevas
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    // Dessiner l'image téléchargée sur le canevas
    ctx.drawImage(image, 0, 0);

    // Ajouter du texte sur l'image
    ctx.fillStyle = textColor;
    ctx.font = `${textSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText(topText, canvas.width / 2, 40);
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);

    // Enregistrer le canevas en tant qu'image sur le serveur
    const fileName = `meme_with_text_${Date.now()}.png`;
    const filePath = path.join(__dirname, 'uploads', fileName);
    const out = fs.createWriteStream(filePath);
    const stream = canvas.createPNGStream();
    stream.pipe(out);

    out.on('finish', () => {
      db.push({ imageUrl: `http://localhost:${port}/uploads/${fileName}`, topText, bottomText, textColor, textSize });
      res.json({ message: 'Image saved successfully', imageUrl: `http://localhost:${port}/uploads/${fileName}` });
    });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route pour obtenir la liste des mèmes
app.get('/memes', (req, res) => {
  const memesWithText = db.map(meme => ({
    imageUrl: meme.imageUrl,
    topText: meme.topText,
    bottomText: meme.bottomText
  }));
  res.json(memesWithText);
});

// Serveur statique pour servir les images
app.use('/uploads', express.static('uploads'));

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
