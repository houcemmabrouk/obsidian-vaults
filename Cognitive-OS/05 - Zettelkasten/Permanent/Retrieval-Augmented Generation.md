---
tags: [permanent, ai]
created: 2026-07-18
aliases: [RAG]
---

# Retrieval-Augmented Generation

**RAG** = donner à un LLM une **mémoire externe** : au lieu de répondre seulement depuis ses poids, il **récupère** des passages pertinents d'une base documentaire et les injecte dans le prompt avant de générer.

## Le pipeline (5 étapes)
1. **Ingestion** — découper les documents en *chunks* (ex. 512 tokens, overlap 128).
2. **Vectorisation** — chaque chunk → [[Vector Embeddings|embedding]] → stocké dans une vector DB (ChromaDB, Qdrant).
3. **Retrieval** — la requête → embedding → *top-k* par similarité cosinus.
4. **Augmentation** — prompt = instruction + chunks récupérés + historique.
5. **Génération** — le [[Large Language Models|LLM]] répond, idéalement en citant ses sources.

## Pourquoi c'est utile
- **Réduit les hallucinations** — réponses ancrées sur des sources vérifiables.
- **Connaissance fraîche/privée** sans réentraîner le modèle.
- **Citations** possibles → confiance.

## Application
Cœur de l'**AI Tutor** de [[CognisAI (Learning OS)]] : RAG sur les curricula officiels CFA/FRM/CPA pour des réponses fiables au LOS près.

## Voir aussi
- [[Large Language Models]] · [[Vector Embeddings]] · [[Prompt Engineering]]
