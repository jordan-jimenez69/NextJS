# Documentation d'Installation et Présentation du Projet

## 0. Guide Utilisateur Basique

### Connexion et Rôles
L'application propose plusieurs rôles utilisateur :
- **Administrateur** : Gestion des utilisateurs, cours et inscriptions.
- **Enseignant** : Gestion des cours et suivi des élèves.
- **Étudiant** : Inscription aux cours et suivi de progression.

### Fonctionnalités Principales
- **Authentification sécurisée** via NextAuth.js
- **Gestion des cours** : Création, modification et suppression
- **Inscriptions aux cours** : Élèves peuvent s'inscrire aux cours
- **Validation des inscription** : Les admins autorise ou non les élèves aux cours
- **Suivi de progression** : Évaluation et commentaires des enseignants
- **Interface responsive** avec Tailwind CSS

### Navigation
Lien Vercel : https://next-js-tan-ten.vercel.app/
- `/login` : Page de connexion
- `/register` : Page d'inscription
- `/teacher/courses` : Gestion des cours pour les enseignants
- `/student/courses` : Inscriptions aux cours pour les élèves
- `/admin/users` : Autorisation aux eleves aux cours


---

## 1. Présentation des Choix Techniques

### **Stack Technologique**
- **Frontend** : Next.js (React, Tailwind CSS)
- **Backend** : Node.js avec API REST
- **Base de données** : PostgreSQL avec `pg` pour les requêtes
- **Authentification** : NextAuth.js
- **Déploiement** : Serveur Linux

### **Architecture de l'Application**
- **Base de données** :
  - `Course` : id, title, description, instrument, teacherId, level, schedule, capacity
  - `Enrollment` : id, studentId, courseId, enrollmentDate, status
  - `Progress` : id, studentId, courseId, date, evaluation, comments
  - `utilisateur` : id, name, email, password, created_at
- **API Routes** :
  - `/api/courses` : CRUD des cours
  - `/api/enrollments` : Gestion des inscriptions
  - `/api/auth` : Authentification NextAuth.js

### **Protection des Routes et Sécurité**
- Middleware de protection selon le rôle utilisateur
- Vérification des permissions dans l’API
- Gestion des sessions avec NextAuth.js

---

## Installation

### **Prérequis**
- Node.js installé
- Fichier DB PostgreSQL

### **Étapes d'Installation**
1. **Cloner le projet**
   ```sh
   git clone https://github.com/mon-projet.git
   cd mon-projet
   ```
2. **Installer les dépendances**
   ```sh
   npm install
   ```
3. **Configurer la base de données**
   - Modifier `.env` avec les infos de PostgreSQL
4. **Lancer le projet en développement**
   ```sh
   npm run dev
   ```