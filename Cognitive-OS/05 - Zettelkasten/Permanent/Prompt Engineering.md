---
tags: [permanent, ai]
created: 2026-07-18
---

# Prompt Engineering

**Prompt engineering** = concevoir l'entrée d'un [[Large Language Models|LLM]] pour obtenir des sorties fiables. Le prompt est le vrai « programme » du modèle.

## Leviers efficaces
- **Rôle & contexte** — « Tu es un tuteur CFA… » cadre le registre.
- **Instructions explicites** — dire précisément le format attendu (liste, JSON, longueur).
- **Few-shot** — donner 1–3 exemples de la sortie voulue.
- **Chain-of-thought** — demander de raisonner étape par étape sur les tâches complexes.
- **Ancrage** — fournir les sources (c'est le principe du [[Retrieval-Augmented Generation|RAG]]).

## Anti-hallucination
- Autoriser « je ne sais pas ».
- Exiger des **citations** des passages fournis.
- Contraindre au contexte donné plutôt qu'aux connaissances générales.

## Lien
Sous-tend l'AI Tutor et le pipeline de génération de contenu de [[CognisAI (Learning OS)]] / [[Wingman v2]] (moteur COGNIS).

## Voir aussi
- [[Large Language Models]] · [[Retrieval-Augmented Generation]] · [[Vector Embeddings]]
