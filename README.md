# ImproseToi

Ce dépôt contient le code source du site web d'Improse Toi, une association d'improvisation et d'éloquence.

## Pages Principales du Site

- **Accueil** : Page principale du site, présentant l'association et ses activités. Ainsi que les évenements (gérer avec le bot discord) de l'association.
- **Inscription** : Permet aux utilisateurs de s'inscrire aux différents ateliers proposés par l'association.
- **Présence** : Permet aux utilisateurs de dire qu'il sont bien présent à un évenement. (ces données serviront pour le bilan générer par le bot discord)

## Installation

1. Clonez ce dépôt sur votre machine locale.
2. Installez les dépendances en exécutant la commande `npm install`.
3. Configurez les variables d'environnement nécessaires dans un fichier `.env`.

Exemple de fichier `.env` :
```plaintext
MONGODB_URI=mongodb+srv://addresse/nombdd?retryWrites=true&w=majority"
TOKEN=token-bot-discord
```
## Utilisation

Pour lancer le serveur de développement, utilisez la commande :

```
npm start
```

Le site sera accessible à l'adresse [http://localhost:4000](http://localhost:4000).

## Contribution

Les contributions sont possible, faites un pull request.

## Contact

Pour toute question ou suggestion, n'hésitez pas à contacter à l'adresse contact@improsetoi.fr.

