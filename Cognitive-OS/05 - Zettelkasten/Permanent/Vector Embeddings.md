---
tags: [permanent, ai]
created: 2026-07-18
aliases: [Embeddings]
---

# Vector Embeddings

Un **embedding** transforme un texte (mot, phrase, chunk) en un **vecteur** de nombres. La géométrie encode le **sens** : deux textes proches par le sens ont des vecteurs proches.

## L'idée clé
On mesure la proximité sémantique par **similarité cosinus** entre vecteurs. « Obligation » et « bond » finissent voisins même sans mot commun → recherche *par sens*, pas par mots-clés.

## À quoi ça sert
- **Recherche sémantique** et étape *retrieval* du [[Retrieval-Augmented Generation|RAG]].
- **Clustering** / regroupement de notes par thème.
- **Recommandation** de contenu proche.

## En pratique
- Modèles : `nomic-embed-text`, OpenAI embeddings… (souvent 768–1536 dimensions).
- Stockés dans une **vector DB** (ChromaDB, Qdrant, pgvector).

## Voir aussi
- [[Retrieval-Augmented Generation]] · [[Large Language Models]]
