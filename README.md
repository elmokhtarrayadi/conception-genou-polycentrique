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
| Migration du CIR annoncée sur la plage initiale | 21,7 mm | La synthèse mentionne 0°–20°, le tableau de points utilise 0°–22° : écart à vérifier |
| Cas de charge statique | 4 000 N | Calcul éléments finis |
| Contrainte retenue à 4 000 N | 360 MPa | Après exclusion d'un pic local interprété comme singularité numérique |
| Facteur de sécurité statique | ≈ 2,44 | Calcul sur le matériau retenu |
| Déplacement maximal | 0,25 mm | Résultat numérique |
| Cas de fatigue étudié | 2 200 N | Estimation analytique fondée sur les contraintes calculées |
| Facteur de sécurité en fatigue | ≈ 1,30 | Estimation préliminaire, sans essai physique |

**Point de vigilance numérique :** les dimensions géométriques finales ne correspondent pas directement au pas de 2,5 mm décrit pour le balayage de paramètres ; la cible de flexion ≥ 120° n'est pas démontrée par le tableau numérique arrêté à 110°. Ces écarts sont explicités dans l'application.

**Limite fondamentale : le prototype physique n'a pas été fabriqué.** Aucun essai mécanique sur un banc ni essai d'utilisation n'a été réalisé. Les résultats ne démontrent ni l'aptitude à l'usage médical ni une certification réglementaire. Les tableaux cinématiques présentent aussi des conventions à consolider avant reproduction indépendante complète.

## Accès au dossier

**[Ouvrir le dossier technique interactif](https://elmokhtarrayadi.github.io/conception-genou-polycentrique/)**. L'application comporte deux visualisations cinématiques distinctes : un mécanisme géométrique 4R **illustratif** avec fermeture et CIR recalculés, et un graphique interactif retraçant **huit valeurs tabulées de l'étude**. Aucun des deux ne constitue une validation biomécanique ou un modèle autorisé pour fabriquer une prothèse utilisable.

Le dossier contient six rubriques : **Synthèse ; Besoin et exigences ; Cinématique et optimisation ; Conception CATIA ; Dimensionnement et calcul ; Fabrication et limites**. Il permet de consulter les fonctions de service, la traçabilité des exigences, les équations de fermeture, la trajectoire numérique du CIR, les cotes fonctionnelles, les plans CATIA, l'évolution du maillage et les gammes d'usinage. Les 17 images techniques et les tableaux sont accessibles sans disposer d'un document supplémentaire.

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

Le dossier est déployé sur GitHub Pages depuis la branche `main`, dossier `/ (root)`, à l'adresse : **https://elmokhtarrayadi.github.io/conception-genou-polycentrique/**.

## Crédit et cadre

Travail académique collectif. Les contributions personnelles peuvent être précisées séparément lors des candidatures. Les schémas, images et données techniques sont présentés comme des éléments d'étude, non comme un produit prêt à la commercialisation.
