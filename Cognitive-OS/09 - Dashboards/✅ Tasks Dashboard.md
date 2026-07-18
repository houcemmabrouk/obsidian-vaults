---
tags: [dashboard]
created: 2026-07-18
---

# ✅ Tasks Dashboard

> Toutes les tâches ouvertes du vault (nécessite **Dataview**).

## ⏳ Tâches en cours (non terminées)
```dataview
TASK
WHERE !completed
GROUP BY file.link
SORT file.mtime DESC
```

## 🎯 Tâches des projets actifs
```dataview
TASK
FROM "01 - Projects"
WHERE !completed
GROUP BY file.link
```

## 📓 Tâches du journal
```dataview
TASK
FROM "06 - Journal"
WHERE !completed
GROUP BY file.link
```

## ✔️ Récemment terminées
```dataview
TASK
WHERE completed
SORT completion DESC
LIMIT 20
```
