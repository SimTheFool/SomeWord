# Cahier des charges - Typing game

### Version 1

## Objectif

    Développer un typing game solo.


## Spécificités fonctionnelles

    Accueil :

    Proposer de démarrer une partie (aucune inscription n’est requise)

<br>

    Jeu (interface) :

    L’interface proposera :
    un HUD  pour afficher la vie et le score du joueur.
    un champ de saisie textuelle.
    un plateau central sur lequel apparaîtront régulièrement des mots.

<br>

    Jeu (gameplay) :

    - Des mots apparaissent sur l’interface.
    - Le joueur doit saisir les mots affiché afin de les faire disparaître.
    - Chaque mot ainsi validé génère du score ainsi qu’un multiplicateur de score qui s’accumule tant qu’aucune erreur de saisie n’intervient.
    - Si le joueur fait une erreur de saisie, le champ de saisie est vidé.
    - Si un mot n’est pas validé à temps, la barre de vie du joueur diminue.
    - Si la barre de vie du joueur tombe à zéro, la partie s’achève et le joueur est redirigé sur l’écran d'accueil, avec son score affiché à l’écran.
    - Des feedbacks audio devront se déclencher tout au long du jeu pour marquer l’action.

<br>

    Responsive :

    L’interface du jeu devra proposer un clavier intégré pour les appareils mobiles.

## Spécificités techniques
    
    React.js
    Redux et react-redux
    Webpack
    Normalize.css
    Gsap
    Apache


<br><br><br>

### Version 2

## Objectif

    Ajouter des parties multijoueurs.


## Spécificités fonctionnelles

    Accueil :

    Proposer de démarrer une partie multijoueur. Après avoir saisi un pseudonyme, le joueur sera alors placé en attente jusqu’à ce qu’un autre joueur rejoigne la partie. Le pseudonyme devra être enregistré dans les cookies du navigateur.

<br>

    Jeu (interface) :

    L’interface du jeu sera dupliquée afin d’afficher l’état de chacun des joueurs.

<br>

    Jeu (gameplay) :

    Les mots à saisir pourront désormais porter des objets.
    Une fois le mot saisi, le joueur récupère l’objet (maximum de trois) et celui-ci s’affichera dans le HUD.
    En saisissant une commande particulière, l’objet pourra être consommé, déclenchant des effets sur le terrain ou le terrain du joueur adverse.

## Spécificités techniques

    React.js
    Redux et react-redux
    Webpack
    Normalize.css
    Gsap
    Apache
    Websockets avec node.js

