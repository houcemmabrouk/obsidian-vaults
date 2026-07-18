---
tags: [weekly]
created: <% tp.date.now("YYYY-MM-DD") %>
---

# 🗓️ Semaine <% tp.date.now("YYYY-[W]ww") %>

## 🔎 Revue (regarder en arrière)
- **Victoires de la semaine :** 
- **Ce qui a coincé :** 
- **Leçons :** 

## 🧹 Traitement du système
- [ ] **Inbox à zéro** — trier chaque note (Project / Area / Resource / Zettel / Archive)
- [ ] Notes Fleeting → Literature/Permanent
- [ ] Nouvelles notes reliées à ≥ 1 note existante
- [ ] Projets terminés → `04 - Archive`

## 🎯 Projets — état
```dataview
TABLE status AS "Statut", deadline AS "Échéance"
FROM "01 - Projects"
WHERE status != "done"
SORT deadline ASC
```

## 🚀 Semaine prochaine (regarder en avant)
- **3 objectifs :**
  - [ ] 
  - [ ] 
  - [ ] 
- **Rendez-vous / deadlines :** 
