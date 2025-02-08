# Meme Generator

## Cloner le dépôt
```bash
git clone https://github.com/Adelbenyoub99/Meme-generator
```

## Instructions pour Visual Studio Code :
- Exécuter la commande :
```bash
cd meme-generator-back 
```
dans l'un des deux.
- Pour installer les dépendances, exécuter la commande 
```bash
npm install 
```
dans chacun des terminaux.
- Lancez les serveurs avec la commande 
```bash
npm start.
```
- Dirigez-vous vers "http://localhost:3000" dans votre navigateur.

## Information importante :

Dans cette application, j'ai utilisé une API externe "Cloudinary" pour stocker les images, cela implique d'avoir une connexion internet pour utiliser l'application.

Deux dossiers ont été créés dans l'explorateur multimédia de Cloudinary, "memes" pour sauvegarder les mèmes téléchargés et "memesShared" pour sauvegarder les mèmes partagés.

Concernant la fonctionnalité de partage des mèmes, certains réseaux sociaux, comme Facebook, peuvent restreindre le partage d'images à partir de liens locaux. En utilisant Cloudinary, j'ai contourné cette limitation en partageant des liens vers des images hébergées sur le CDN de Cloudinary, assurant ainsi une compatibilité avec les plateformes de médias sociaux.