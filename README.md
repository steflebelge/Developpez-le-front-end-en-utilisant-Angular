# 🏅 Développez le front-end en utilisant Angular

Ce projet est une application Angular pour recuperer et afficher les données des derniers Jeux Olympiques (ex. médailles, participations…).

---

## 🔧 Technologies utilisées

- **Angular** — framework front-end basé sur TypeScript
- **TypeScript** — langage principal du projet
- **SCSS** — préprocesseur CSS pour structurer les styles
- **ng2-charts / Chart.js** — pour les visualisations graphiques
- **RxJS**, **HttpClient** — gestion des appels API et du flux réactif
- **Angular CLI** — pour le build, le serveur de développement, etc.

---

## 🚀 Installation et exécution

### 1. Cloner le dépôt

```bash
git clone https://github.com/steflebelge/Developpez-le-front-end-en-utilisant-Angular.git
cd Developpez-le-front-end-en-utilisant-Angular
```

### 2. Installer les dépendances

Assurez-vous d’avoir **Node.js** v.20.19.2 et **npm** v.11.4.1 installés sur votre machine.

```bash
npm install
```

### 3. Lancer le serveur de développement

```bash
ng serve
```

Puis ouvrez votre navigateur à l’adresse suivante : [http://localhost:4200](http://localhost:4200)

L’application se recompile automatiquement dès que vous modifiez un fichier source.

---

## ✅ Structure du projet

```
src/
├── app/
│   ├── core/              # services et modèles
│   ├── header/            # composant de navigation de l’application
│   ├── pages/             # composants de pages complètes
│   ├── shared/            # composants réutilisables
├── assets/                # données JSON, images, etc.
├── styles.scss            # styles globaux
└── index.html             # point d’entrée principal
```

---

## 📦 Build de production

Pour compiler et optimiser l’application Angular en mode production :

```bash
ng build --prod
```

Les fichiers générés se trouvent dans `dist/olympic-games-starter/`.

---

