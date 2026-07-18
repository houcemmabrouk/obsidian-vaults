---
tags: [home, moc]
created: 2026-07-18
cssclasses: [dashboard]
---

# 🏠 Home — Cognitive OS

> *« Ton esprit est fait pour avoir des idées, pas pour les retenir. »* — David Allen

## ⚡ Accès rapide

- 📥 **[[00 - Inbox/Inbox|Inbox]]** — vider la tête ici d'abord
- 📓 **[[06 - Journal/Daily/2026-07-18|Note du jour]]**
- 📊 **[[📊 Dashboard]]** — vue d'ensemble dynamique
- ✅ **[[✅ Tasks Dashboard]]** — toutes les tâches ouvertes
- 🗺️ **[[🗺️ Master Index|Master Index (MOC des MOCs)]]**

## 🎯 Projets actifs

```dataview
TABLE WITHOUT ID file.link AS "Projet", status AS "Statut", deadline AS "Échéance"
FROM "01 - Projects"
WHERE status != "done" AND file.name != "_Projects"
SORT deadline ASC
```

## 🗺️ Cartes de contenu (MOCs)

- 🧠 [[🧠 Learning Science MOC]]
- 💰 [[💰 Finance MOC]]
- 🚀 [[🚀 Projects MOC]]

## 🔁 Domaines (Areas)

- [[Finance & Investing]]
- [[Learning & Productivity]]
- [[Software & Product]]

## 💡 Dernières notes permanentes

```dataview
LIST
FROM "05 - Zettelkasten/Permanent"
SORT file.mtime DESC
LIMIT 8
```

## 📥 À trier (Inbox)

```dataview
LIST
FROM "00 - Inbox"
WHERE file.name != "Inbox"
SORT file.ctime DESC
```

---
> [!tip] Rituel quotidien
> **Matin** : ouvrir la note du jour → 3 priorités. **Soir** : vider l'Inbox → traiter chaque capture (Project / Area / Resource / Zettel / Archive / poubelle).
