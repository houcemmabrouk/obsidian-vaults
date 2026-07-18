---
tags: [dashboard, moc]
created: 2026-07-18
---

# 📊 Dashboard

> Vue d'ensemble dynamique du vault (nécessite **Dataview**).

## 🎯 Projets par statut
```dataview
TABLE WITHOUT ID file.link AS "Projet", status AS "Statut", deadline AS "Échéance"
FROM "01 - Projects"
SORT status ASC, deadline ASC
```

## 🔁 Areas
```dataview
LIST
FROM "02 - Areas"
SORT file.name ASC
```

## 💡 Notes permanentes récentes
```dataview
TABLE WITHOUT ID file.link AS "Note", file.mtime AS "Modifié"
FROM "05 - Zettelkasten/Permanent"
SORT file.mtime DESC
LIMIT 10
```

## 📚 Notes de lecture
```dataview
TABLE WITHOUT ID file.link AS "Source", author AS "Auteur", year AS "Année"
FROM "05 - Zettelkasten/Literature"
SORT file.mtime DESC
```

## 📥 Inbox à traiter
```dataview
LIST
FROM "00 - Inbox"
WHERE file.name != "Inbox"
SORT file.ctime DESC
```

## 🗺️ MOCs
```dataview
LIST
FROM #moc
SORT file.name ASC
```

## 📈 Stats du vault
```dataview
TABLE length(rows) AS "Nb notes"
FROM "" 
WHERE file.name != this.file.name
GROUP BY split(file.folder, "/")[0] AS "Dossier"
SORT rows DESC
```
