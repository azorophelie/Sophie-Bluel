# Portfolio-architecte-sophie-bluel

**Projet 3 de ma formation Développeur Web chez OpenClassrooms 2024**

Ce projet est un site web dynamique. 
Il a été réalisé avec l’agence ArchiWebos, qui compte 50 collaborateurs, et s’inscrit dans un contexte professionnel collaboratif.

#### L’objectif est de transformer un site statique en un site fonctionnel et interactif, permettant :

- d’afficher les travaux de l’architecte depuis une base de données,
- de filtrer les projets par catégories,
- de gérer l’authentification d’un administrateur,
- et de permettre l’ajout/suppression de projets via une interface d’administration.

---

## Prérequis et lancement du projet

Avant de démarrer, assurez-vous d’avoir installé :
- Node.js et npm
- Un éditeur de code comme VS Code
- Un navigateur web moderne (Chrome, Firefox, Edge, Safari…)
> Optionnel : Postman
 ou Swagger pour tester l’API

#### Cloner le dépôt
```sh
git clone git@github.com:azorophelie/Sophie-Bluel.git
```

#### Lancer le Backend
```sh
cd backend
```

### Installer le package des dépendances Back End:
```sh
npm install
```

#### Démarrez le serveur :
```sh
npm start
```

#### Lancer le Frontend
```sh
cd frontend
```
- *Lancez Live Server depuis votre IDE (VS Code) pour ouvrir le site dans le navigateur.*
> Astuce : Si vous souhaitez afficher le code du backend et du frontend en même temps, faites-le dans 2 instances VS Code différentes pour éviter tout conflit.

## Technologies utilisées

![HTML](https://img.shields.io/badge/HTML-FF69B4)
![CSS](https://img.shields.io/badge/CSS-green)
![JavaScript](https://img.shields.io/badge/JavaScript-yellow)
![Node.js](https://img.shields.io/badge/NODE.JS-blue?style=flat-square)
![NPM](https://img.shields.io/badge/NPM-orange?style=flat-square)

---

## Fonctionnalités principales

- Page d’accueil avec galerie des travaux récupérée dynamiquement depuis le back-end
- Filtrage par catégories (ex : appartements, hôtels, etc.)
- Page de connexion administrateur avec authentification et gestion des erreurs
- Mode administrateur permettant d’ajouter ou supprimer des projets
- Modale interactive pour uploader de nouveaux médias sans recharger la page

## Structure des fichiers

- index.html : page d’accueil du site
- /css/ : styles du site
- /js/ : scripts JavaScript (gestion API, modale, login, etc.)
- /backend/ : dossier contenant l’API et la base de données (fourni)
- /images/ : images du projet

## Contexte du projet

#### Vous collaborez avec :

- Charlotte, cheffe de projet, qui fournit le brief et le suivi via Kanban
- L’équipe back-end, qui met à disposition une API documentée avec Swagger
- Les designers, qui partagent les maquettes via Figma

#### Éléments fournis par l’équipe :

- **Figma du design (desktop et mobile)** : [Lien vers la maquette](https://www.figma.com/design/kfKHknHySoTibZfdolGAX6/Sophie-Bluel---Desktop?node-id=0-1&p=f&t=LgDIw34PQqTT9vLw-0)
- **Code back-end (API + base de données) et code front-end du départ** : [Lien vers le code](https://github.com/OpenClassrooms-Student-Center/Portfolio-architecte-sophie-bluel)
- **Kanban des tâches à réaliser** : [Lien vers le Kanban](https://openclassrooms.notion.site/da3bb5863a554b34ba1a8df90d4c99af?v=df7f8dcccd9f4917a664a559f00b7ccb&p=c10173024288498295c67b9625cf437f&pm=s)

## Missions principales :

- Développer la page de présentation des travaux de l’architecte (intégration dynamique).
- Créer la page de connexion administrateur avec authentification.
- Développer une modale fonctionnelle pour uploader de nouveaux projets (ajout/suppression).
