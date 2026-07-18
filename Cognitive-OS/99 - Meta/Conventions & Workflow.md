---
tags: [meta]
created: 2026-07-18
---

# 📐 Conventions & Workflow

## Où va chaque note ? (arbre de décision)

> Quand je capture quelque chose, je me pose ces questions dans l'ordre :

1. **Est-ce une action à mener maintenant, avec une fin ?** → `01 - Projects`
2. **Est-ce une responsabilité continue ?** → `02 - Areas`
3. **Est-ce une référence pour plus tard ?** → `03 - Resources`
4. **Est-ce une idée que je veux penser/relier ?** → `05 - Zettelkasten`
5. **Sinon** → poubelle ou `04 - Archive`

En cas de doute → ça reste dans `00 - Inbox` jusqu'au prochain tri.

## Nommage des fichiers

| Type | Convention | Exemple |
| --- | --- | --- |
| Daily note | `YYYY-MM-DD` | `2026-07-18` |
| Weekly note | `YYYY-[W]ww` | `2026-W29` |
| Permanent note | Titre = l'idée, en clair | `Active Recall` |
| Literature note | `@AuteurAnnée — Titre` | `@Newport2016 — Deep Work` |
| Project / Area | Nom lisible | `CFA Level 1` |
| MOC | `emoji Sujet MOC` | `🧠 Learning Science MOC` |

## Frontmatter standard

```yaml
---
tags: [type/xxx, sujet]
created: YYYY-MM-DD
status: active        # projets : active | on-hold | done
deadline: YYYY-MM-DD  # projets uniquement
source:               # literature notes
---
```

## Tags (à plat, minimalistes)

- **Type** : `#permanent` `#literature` `#fleeting` `#project` `#area` `#moc` `#daily`
- **Sujet** : `#finance` `#learning` `#ai` `#product` `#health` …
- Règle : on préfère les **liens `[[wikilink]]`** aux tags pour connecter les idées. Les tags servent surtout à filtrer par *type*.

## Liens

- **Toujours** relier une nouvelle note à ≥ 1 note existante (souvent un MOC).
- Utiliser `[[Note]]` et `[[Note|alias]]`.
- Une **note permanente** finit idéalement par une section *« Voir aussi »* listant ses connexions.

## Rituels

| Rythme | Rituel | Note |
| --- | --- | --- |
| Quotidien | Capturer + 3 priorités + revue du soir | [[08 - Templates/Daily Note\|Daily Note]] |
| Hebdo | Weekly Review : vider Inbox, avancer projets | [[08 - Templates/Weekly Review\|Weekly Review]] |
| Mensuel | Bilan, archivage, objectifs | `06 - Journal/Monthly` |

## Workflow de traitement de l'Inbox

1. Ouvrir `00 - Inbox`.
2. Pour chaque note : appliquer l'arbre de décision ci-dessus.
3. Déplacer la note dans le bon dossier + ajouter frontmatter + **au moins un lien**.
4. L'Inbox doit être **vide** après la weekly review.

Voir aussi : [[About Cognitive OS]] · [[PARA Method]] · [[Zettelkasten Method]].
