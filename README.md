# ISI Innovations Day - Hackathon Subscription Platform

## Table des matieres

1. [Presentation du projet](#presentation-du-projet)
2. [Stack technique](#stack-technique)
3. [Roles et cas d'utilisation](#roles-et-cas-dutilisation)
4. [Architecture backend](#architecture-backend)
5. [Architecture frontend](#architecture-frontend)
6. [Modele de donnees](#modele-de-donnees)
7. [Installation et configuration](#installation-et-configuration)
8. [Variables d'environnement](#variables-denvironnement)
9. [Perimetre actuel et evolutions](#perimetre-actuel-et-evolutions)

---

## Presentation du projet

ISI Innovations Day est une plateforme web de gestion des participations au hackathon annuel organise par l'Ecole Superieure d'Informatique (ISI). Elle centralise la gestion des themes, des projets, des equipes et des inscriptions des participants.

La plateforme propose deux modes de participation distincts : un utilisateur peut manifester son interet pour un projet existant, auquel cas c'est l'administrateur qui constituera l'equipe et notifiera les membres ; ou bien un utilisateur peut directement creer son equipe autour d'un projet disponible et y inscrire ses membres manuellement.

La plateforme est actuellement dediee exclusivement au hackathon ISI Innovations Day. La gestion de plusieurs editions ou de plusieurs concours distincts n'est pas encore supportee.

---

## Stack technique

### Backend

| Element              | Choix technique                              |
|----------------------|----------------------------------------------|
| Framework            | Laravel 11                                   |
| Authentification     | Laravel Sanctum (token personnel)            |
| Base de donnees      | PostgreSQL                                   |
| Architecture metier  | Service Layer avec injection de dependances  |
| Evenements           | Laravel Events et Listeners                  |
| Notifications        | Laravel Notifications (canal mail)           |
| Autorisation         | Laravel Policies (Project, Theme)            |
| Validation           | Form Requests par ressource                  |
| Serialisation        | API Resources                                |
| Documentation API    | Scribe                                       |

### Frontend

| Element           | Choix technique                        |
|-------------------|----------------------------------------|
| Framework         | React 18 avec TypeScript               |
| Styling           | Tailwind CSS                           |
| Composants UI     | shadcn/ui                              |
| Gestion auth      | React Context (AuthContext)            |
| Appels API        | Services par domaine + Custom Hooks    |
| Typage metier     | Types TypeScript centralises           |
| Routing           | React Router avec routes privees       |

---

## Roles et cas d'utilisation

### Administrateur

L'administrateur dispose d'un acces complet via le middleware `EnsureUserIsAdmin`. Ses actions sont :

- Creer et gerer le hackathon ISI Innovations Day.
- Creer les themes rattaches au hackathon.
- Creer les projets rattaches aux themes.
- Consulter les utilisateurs ayant exprime un interet pour un projet.
- Constituer une equipe a partir de ces utilisateurs et les notifier automatiquement par mail.

### Utilisateur - Mode interet

Un utilisateur authentifie parcourt les projets disponibles par theme et marque son interet pour un ou plusieurs projets. Il n'effectue aucune action supplementaire. L'administrateur prend le relais pour constituer l'equipe et envoyer les notifications.

Parcours :

```
Connexion
  -> Consultation des projets par theme
  -> Expression d'interet sur un projet
  -> Attente de notification par mail
```

### Utilisateur - Mode creation d'equipe

Un utilisateur authentifie cree directement son equipe en choisissant un projet dans la liste disponible, en nommant l'equipe, puis en enregistrant chaque membre manuellement avec ses informations academiques (matricule, prenom, nom, classe, filiere). Ce mode de saisie manuelle est justifie par le contexte : le concours est interne a l'ISI et les membres d'une equipe ne disposent pas necessairement tous d'un compte sur la plateforme.

Parcours :

```
Connexion
  -> Consultation des projets disponibles
  -> Selection d'un projet
  -> Creation de l'equipe
  -> Ajout des membres (matricule, prenom, nom, classe, filiere)
  -> Soumission
```

---

## Architecture backend

```
backend/
├── app/
│   ├── Enums/
│   │   ├── Filiere.php
│   │   └── Grade.php
│   ├── Events/
│   │   ├── InterrestAddedInTeamEvent.php
│   │   ├── MemberCreatedEvent.php
│   │   ├── TeamCreatedEvent.php
│   │   └── UserRegistered.php
│   ├── Http/
│   │   ├── Controllers/Api/V1/
│   │   │   ├── AdminController.php
│   │   │   ├── AuthController.php
│   │   │   ├── HackathonController.php
│   │   │   ├── InterestedController.php
│   │   │   ├── MemberController.php
│   │   │   ├── ProjectController.php
│   │   │   ├── TeamController.php
│   │   │   ├── TeamMateController.php
│   │   │   └── ThemeController.php
│   │   ├── Middleware/
│   │   │   └── EnsureUserIsAdmin.php
│   │   ├── Requests/
│   │   │   ├── Auth/
│   │   │   │   ├── LoginRequest.php
│   │   │   │   └── RegisterRequest.php
│   │   │   ├── Hackathon/
│   │   │   │   └── StoreHackathonRequest.php
│   │   │   ├── Interested/
│   │   │   │   ├── StoreInterestedRequest.php
│   │   │   │   └── UpdateInterestedRequest.php
│   │   │   ├── Project/
│   │   │   │   ├── StoreProjectRequest.php
│   │   │   │   ├── StoreThemeRequest.php
│   │   │   │   ├── UpdateProjectRequest.php
│   │   │   │   └── UpdateThemeRequest.php
│   │   │   ├── Member/
│   │   │   ├── Team/
│   │   │   └── TeamMate/
│   │   └── Resources/
│   │       ├── HackathonResource.php
│   │       ├── InterrestResource.php
│   │       ├── MemberResource.php
│   │       ├── ProjectResource.php
│   │       ├── TeamMateResource.php
│   │       ├── TeamResource.php
│   │       ├── ThemeResource.php
│   │       └── UserResource.php
│   ├── Listeners/
│   │   ├── InterrestAddedInTeamListener.php
│   │   ├── MemberCreatedListener.php
│   │   ├── TeamCreatedListener.php
│   │   └── UserRegisteredListener.php
│   ├── Models/
│   │   ├── Admin.php
│   │   ├── Hackathon.php
│   │   ├── Interested.php
│   │   ├── Member.php
│   │   ├── Project.php
│   │   ├── Team.php
│   │   ├── TeamMate.php
│   │   ├── Theme.php
│   │   └── User.php
│   ├── Notifications/
│   │   ├── InterrestAddedInTeam.php
│   │   ├── MemberCreatedNotification.php
│   │   └── TeamCreatedNotification.php
│   ├── Policies/
│   │   ├── ProjectPolicy.php
│   │   └── ThemePolicy.php
│   ├── Providers/
│   │   └── AppServiceProvider.php
│   └── Services/
│       ├── AdminServices.php
│       ├── AuthService.php
│       ├── InterrestServices.php
│       ├── MemberServices.php
│       ├── TeamMateServices.php
│       └── TeamService.php
└── .scribe/
```

### Service Layer et injection de dependances

Les controllers ne contiennent pas de logique metier. Chaque controller declare son service en parametre de constructeur ; le conteneur IoC de Laravel resout et injecte automatiquement la dependance. Toute la logique de traitement, les interactions avec la base de donnees et le declenchement des evenements sont encapsules dans les services.

Le flux d'une requete suit toujours le chemin suivant :

```
Request -> Form Request (validation) -> Controller -> Service -> Event -> Listener -> Notification
```

### Systeme d'evenements (Events / Listeners)

Le projet utilise le systeme Events / Listeners de Laravel pour decoupler les effets de bord des actions metier. Chaque action significative declenche un evenement ; le listener correspondant se charge ensuite d'envoyer la notification appropriee. Les services ne savent pas comment les notifications sont envoyees, ils se contentent de dispatcher l'evenement.

| Evenement                    | Listener associe                  | Contexte de declenchement                           |
|------------------------------|-----------------------------------|-----------------------------------------------------|
| `UserRegistered`             | `UserRegisteredListener`          | Inscription d'un nouvel utilisateur                 |
| `TeamCreatedEvent`           | `TeamCreatedListener`             | Creation d'une equipe (par user ou par admin)       |
| `MemberCreatedEvent`         | `MemberCreatedListener`           | Ajout d'un membre dans une equipe                   |
| `InterrestAddedInTeamEvent`  | `InterrestAddedInTeamListener`    | Utilisateur interesse integre dans une equipe       |

### Notifications

Les notifications sont implementees via Laravel Notifications sur le canal mail. Chaque notification correspond a un evenement metier et cible un destinataire precis.

| Notification                 | Destinataire               | Moment d'envoi                                         |
|------------------------------|----------------------------|--------------------------------------------------------|
| `TeamCreatedNotification`    | Createur de l'equipe       | Confirmation apres creation d'une equipe               |
| `MemberCreatedNotification`  | Membre ajoute              | Un membre a ete inscrit dans une equipe                |
| `InterrestAddedInTeam`       | Utilisateur interesse      | L'admin l'a integre dans une equipe depuis ses interets |

### Policies

Deux policies controlent l'autorisation sur les ressources Project et Theme, en complement du middleware `EnsureUserIsAdmin` qui protege les routes d'administration.

- `ProjectPolicy` : definit les regles d'acces pour la creation, la modification et la suppression d'un projet.
- `ThemePolicy` : definit les regles d'acces pour la creation, la modification et la suppression d'un theme.

### Enums

Deux enums PHP natifs structurent les valeurs metier fixes utilisees pour les membres d'equipe :

- `Filiere` : liste des filieres academiques disponibles.
- `Grade` : liste des niveaux et classes disponibles.

Ces enums garantissent que les valeurs saisies sont contraintes a un referentiel connu, tant cote validation que cote base de donnees.

### API Resources

Chaque entite dispose de sa propre Resource Laravel qui controle la forme exacte de la reponse JSON retournee au client. Cela isole la representation externe du modele interne et permet de faire evoluer l'un sans impacter l'autre.

---

## Architecture frontend

```
frontend/
├── src/
│   ├── api/
│   │   └── api.tsx
│   ├── components/
│   │   ├── app/
│   │   ├── layouts/
│   │   ├── ui/
│   │   └── utils/
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   ├── auth/
│   │   │   ├── useLogin.ts
│   │   │   └── useRegister.ts
│   │   ├── filiere/
│   │   │   └── useFiliere.ts
│   │   ├── grade/
│   │   │   └── useGrade.ts
│   │   └── project/
│   ├── lib/
│   ├── pages/
│   │   ├── admin/
│   │   ├── auth/
│   │   └── home/
│   │       └── home.tsx
│   ├── routes/
│   │   ├── appRoutes.tsx
│   │   └── privateRoutes.tsx
│   ├── services/
│   │   ├── auth/
│   │   │   ├── currentUser.ts
│   │   │   ├── filiere.ts
│   │   │   ├── grade.ts
│   │   │   ├── login.ts
│   │   │   ├── logout.ts
│   │   │   └── register.ts
│   │   ├── project/
│   │   │   └── project.ts
│   │   └── team/
│   └── types/
│       ├── auth.ts
│       ├── filiere.ts
│       ├── grade.ts
│       ├── hackathon.ts
│       ├── interrest.ts
│       ├── project.ts
│       ├── team.ts
│       ├── theme.ts
│       └── types.ts
```

### Instance Axios (api/api.tsx)

Ce fichier centralise la configuration HTTP de l'application. Il cree une instance Axios avec l'URL de base issue des variables d'environnement et y attache un intercepteur de requetes qui ajoute automatiquement le token Sanctum dans l'en-tete `Authorization: Bearer` avant chaque appel sortant. Tous les services consomment cette instance unique.

### Contexte d'authentification (context/AuthContext.tsx)

`AuthContext` gere l'etat global de session de l'application. Il expose l'utilisateur courant, le statut d'authentification, ainsi que les methodes de connexion et de deconnexion. Place en haut de l'arbre de composants, il rend ces informations accessibles partout dans l'application sans prop drilling.

### Services (services/)

Les services sont organises par domaine fonctionnel. Chaque fichier represente une operation precise et appelee vers l'API (login, logout, register, recuperation de l'utilisateur courant, recuperation des projets, etc.). Les services consomment l'instance Axios centrale, retournent les donnees brutes et ne contiennent aucune logique d'etat React. Cette separation permet de les tester et de les faire evoluer independamment des composants.

### Custom Hooks (hooks/)

Les hooks personnalises sont le point d'entree des composants pour toute donnee asynchrone. Chaque hook appelle le service correspondant et gere localement les etats de chargement et d'erreur. Les composants de presentation restent ainsi simples : ils consomment un hook et affichent les donnees recues.

Les hooks sont organises par domaine en miroir des services : `auth/`, `filiere/`, `grade/`, `project/`.

### Typage (types/)

L'ensemble des entites metier est type dans `src/types/`, un fichier par domaine. Ces types sont partages entre services, hooks et composants pour garantir la coherence du typage sur toute l'application et beneficier pleinement de la verification statique de TypeScript.

### Routing (routes/)

La navigation est decoupee en deux fichiers :

- `appRoutes.tsx` declare l'ensemble des routes de l'application et leur composant associe.
- `privateRoutes.tsx` est un composant de garde qui verifie l'authentification avant de rendre une route protegee. Tout utilisateur non authentifie est redirige vers la page de connexion.

---

## Modele de donnees

La base de donnees est PostgreSQL. Les entites principales sont les suivantes.

**Hackathon** - Represente le concours. Une seule instance est active (ISI Innovations Day). Un hackathon contient plusieurs themes.

**Theme** - Categorie thematique rattachee a un hackathon. Un theme regroupe plusieurs projets.

**Project** - Projet propose dans le cadre d'un theme. C'est la liste de ces projets, organises par theme, qui est affichee sur l'interface publique.

**Interested** - Manifestation d'interet d'un utilisateur pour un projet. Un utilisateur peut exprimer son interet pour plusieurs projets.

**Team** - Equipe constituee autour d'un projet. Peut etre creee directement par un utilisateur ou par l'administrateur a partir des interets recus.

**Member** - Membre d'une equipe creee par l'administrateur. Correspond a un utilisateur de la plateforme qui a ete integre dans une equipe suite a son interet.

**TeamMate** - Membre d'une equipe creee directement par un utilisateur. Saisi manuellement : matricule, prenom, nom, classe (Enum Grade), filiere (Enum Filiere). Ne necessite pas de compte sur la plateforme.

**User** - Utilisateur authentifie de la plateforme.

**Admin** - Entite separee representant le compte administrateur, distinct du modele User.

---

## Installation et configuration

### Prerequis

- PHP 8.2 ou superieur
- Composer
- Node.js 18 ou superieur
- PostgreSQL

### Backend

```bash
cd backend

composer install

cp .env.example .env
php artisan key:generate

# Configurer la connexion PostgreSQL dans .env

php artisan migrate
php artisan db:seed

php artisan serve
```

### Frontend

```bash
cd frontend

npm install

cp .env.example .env

# Definir VITE_API_URL dans .env

npm run dev
```

---

## Variables d'environnement

### Backend (.env)

```
APP_NAME="ISI Innovations Day"
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=hackathon_db
DB_USERNAME=
DB_PASSWORD=

MAIL_MAILER=smtp
MAIL_HOST=
MAIL_PORT=587
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_FROM_ADDRESS=noreply@isi-innovations.sn
MAIL_FROM_NAME="ISI Innovations Day"

SANCTUM_STATEFUL_DOMAINS=localhost:5173
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:8000/api
```

---

## Perimetre actuel et evolutions

La plateforme est actuellement limitee au hackathon ISI Innovations Day. L'interface affiche uniquement les projets et themes rattaches a ce concours. Il n'est pas encore possible de naviguer entre plusieurs editions ou plusieurs concours.

Parmi les evolutions envisageables :

- Gestion de plusieurs editions du hackathon avec selection de l'edition active.
- Possibilite pour les membres d'une equipe de rejoindre via un lien d'invitation plutot que par saisie manuelle.
- Tableau de bord de suivi des equipes et des soumissions finales.
- Extension a d'autres concours ou hackathons exterieurs a l'ISI.
