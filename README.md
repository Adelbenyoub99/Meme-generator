Git Bash :
git clone https://github.com/Adelbenyoub99/Meme-generator

VSCode :
- Ouvrir deux terminaux. 
- Exécuter la commande "cd meme-generator-back" dans l'un des deux.
- Pour installer les dépendances, exécuter la commande "npm install" dans chacun des terminaux.
- Dans le terminal back, lancez le serveur avec la commande "npm start".
- Avec la même commande, lancez le serveur frontend.
- Dirigez-vous vers "http://localhost:3000" dans votre navigateur.

Information importante :

Dans cette application, j'ai utilisé une API externe "Cloudinary" pour stocker les images, cela implique d'avoir une connexion internet pour utiliser l'application.

Deux dossiers ont été créés dans l'explorateur multimédia de Cloudinary, "memes" pour sauvegarder les mèmes téléchargés et "memesShared" pour sauvegarder les mèmes partagés.

Les bonnes pratiques exigent de ne pas inclure le fichier de configuration (le jeton de l'API Cloudinary), cependant pour le bien du test d'admission j'ai décidé de l'inclure.

Concernant la fonctionnalité de partage des mèmes, certains réseaux sociaux, comme Facebook, peuvent restreindre le partage d'images à partir de liens locaux. En utilisant Cloudinary, j'ai contourné cette limitation en partageant des liens vers des images hébergées sur le CDN de Cloudinary, assurant ainsi une compatibilité avec les plateformes de médias sociaux.