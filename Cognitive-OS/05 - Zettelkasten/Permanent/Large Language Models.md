---
tags: [permanent, ai]
created: 2026-07-18
aliases: [LLM, LLMs]
---

# Large Language Models

Un **LLM** est un réseau de neurones (architecture *Transformer*) entraîné à prédire le prochain token sur d'immenses corpus. De cette simple tâche émergent traduction, raisonnement, code, dialogue.

## Notions clés
- **Token** — unité de texte (~¾ mot). Contexte et coût se comptent en tokens.
- **Context window** — quantité de texte « vue » d'un coup ; limite la mémoire de travail du modèle.
- **Temperature** — contrôle l'aléa : bas = déterministe, haut = créatif.
- **Poids figés** — sans outils, un LLM ne connaît que son corpus d'entraînement (d'où le [[Retrieval-Augmented Generation|RAG]]).

## Limites à connaître
- **Hallucinations** — génère du plausible, pas forcément du vrai.
- **Cutoff** — pas de connaissance postérieure à l'entraînement.
- **Pas de mémoire** entre requêtes (sauf contexte réinjecté).

## Local vs cloud
- **Local** (Ollama + LLaMA3) — confidentialité, coût maîtrisé.
- **Cloud** (GPT-4o…) — puissance maximale, latence/coût variables.
Choix fait dans [[CognisAI (Learning OS)]] : local par défaut, cloud en fallback.

## Voir aussi
- [[Retrieval-Augmented Generation]] · [[Vector Embeddings]] · [[Prompt Engineering]]
