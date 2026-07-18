---
tags: [moc, ai]
created: 2026-07-18
---

# 🤖 AI & LLM MOC

> Carte des concepts d'IA générative qui sous-tendent mes produits.

## Fondations
- [[Large Language Models]] — Transformers, tokens, contexte, limites
- [[Vector Embeddings]] — représenter le sens en vecteurs
- [[Retrieval-Augmented Generation]] — donner une mémoire externe au LLM
- [[Prompt Engineering]] — piloter les sorties

## Comment ça s'assemble
```
Documents → [[Vector Embeddings]] → vector DB
                                        │
Requête → embedding → retrieval top-k ──┤
                                        ▼
      [[Prompt Engineering|prompt]] + chunks → [[Large Language Models|LLM]] → réponse citée
                     (= [[Retrieval-Augmented Generation|RAG]])
```

## Applications produit
- [[CognisAI (Learning OS)]] — AI Tutor RAG sur curricula officiels
- [[Wingman v2]] — moteur COGNIS (génération de contenu)
- [[Quantum Terminal]] — sentiment NLP sur news

## Toutes les notes IA
```dataview
LIST
FROM #ai
WHERE file.name != this.file.name
SORT file.name ASC
```
