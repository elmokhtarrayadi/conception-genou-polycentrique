# Conception d'une prothèse externe de genou polycentrique

**Projet d'innovation académique, réalisé en groupe (2025–2026)** · Génie mécanique des systèmes industriels · Elmokhtar Rayadi

**🌐 [OUVRIR LA DÉMO INTERACTIVE](https://elmokhtarrayadi.github.io/conception-genou-polycentrique/)**

[Consulter le code de l'application](./index.html)

## Résumé pour un recruteur

Le projet étudie la **conception mécanique d'un genou prothétique polycentrique à quatre barres**, destiné à relier une emboîture fémorale et un pied prothétique. Le problème consiste à combiner la stabilité du mécanisme pendant l'appui, la mobilité en phase oscillante, la résistance structurelle et la possibilité de fabriquer les pièces.

La démarche comprend : **analyse fonctionnelle et SysML ; cinématique 4R et migration du centre instantané de rotation ; recherche de dimensions ; dimensionnement RDM et sélection des matériaux ; conception des pièces et de l'assemblage sous CATIA V5 ; préparation du modèle SpaceClaim et calculs sur SimScale ; définition des opérations d'usinage.**

### Chiffres de l'étude

| Indicateur | Résultat annoncé | Portée |
| --- | ---: | --- |
| Masse de l'assemblage CAO | 452 g | Propriétés de masse du modèle |
| Migration du CIR (0° à 20°) | 21,7 mm | Résultat de l'étude cinématique |
| Cas de charge statique | 4 000 N | Calcul éléments finis |
| Contrainte retenue à 4 000 N | 360 MPa | Après exclusion d'un pic local interprété comme singularité numérique |
| Facteur de sécurité statique | ≈ 2,44 | Calcul sur le matériau retenu |
| Déplacement maximal | 0,25 mm | Résultat numérique |
| Cas de fatigue étudié | 2 200 N | Estimation analytique fondée sur les contraintes calculées |
| Facteur de sécurité en fatigue | ≈ 1,30 | Estimation préliminaire, sans essai physique |

**Limite fondamentale : le prototype physique n'a pas été fabriqué.** Aucun essai mécanique sur un banc ni essai d'utilisation n'a été réalisé. Les résultats ne démontrent ni l'aptitude à l'usage médical ni une certification réglementaire. Les tableaux cinématiques présentent aussi des conventions à consolider avant reproduction indépendante complète.

## Accès au dossier

Ouvrez [`index.html`](./index.html) directement dans un navigateur. Aucun serveur, compte ni dépendance n'est nécessaire. La visualisation 4R propose un mécanisme géométrique **illustratif**, paramétré avec les longueurs nominales de l'étude ; elle ne reproduit pas numériquement toute la trajectoire publiée et ne doit pas servir à dimensionner un dispositif réel.

Le dossier contient six rubriques : **Synthèse ; Besoin et exigences ; Cinématique et optimisation ; Conception CATIA ; Dimensionnement et calcul ; Fabrication et limites**. Les images sont des figures techniques de l'étude (assemblage, dessins de définition, simulation, fabrication).

## Structure du dépôt

```text
conception-genou-polycentrique/
├── index.html       # dossier interactif
├── style.css        # présentation sobre et adaptative
├── app.js           # navigation, galerie, 4R illustratif et visualisation des résultats
├── assets/          # extraits graphiques du dossier technique
└── README.md
```

## Publication GitHub Pages

Les fichiers complets sont déposés à la racine du dépôt, avec les 17 illustrations dans `assets/`. Pour activer la démonstration, sélectionner dans **Settings → Pages → Build and deployment** : **Deploy from a branch**, branche `main`, dossier `/ (root)`, puis enregistrer. L'adresse prévue est `https://elmokhtarrayadi.github.io/conception-genou-polycentrique/`. La démonstration est publiée sur GitHub Pages ; son accès public repose sur la branche `main` et le dossier `/ (root)`.

## Crédit et cadre

Travail académique collectif. Les contributions personnelles peuvent être précisées séparément lors des candidatures. Les schémas, images et données techniques sont présentés comme des éléments d'étude, non comme un produit prêt à la commercialisation.
