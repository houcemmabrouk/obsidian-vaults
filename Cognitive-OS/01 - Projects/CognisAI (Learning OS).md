---
tags: [project, ai, product, learning, finance]
created: 2026-07-18
status: active
deadline: 2026-12-31
aliases: [CognisAI, CognisIA, Learning OS]
---

# 🚀 CognisAI — The Operating System for Analyst Excellence

> *« L'Operating System pour maîtriser les examens avec IA et neuroscience. »*
> CDC v3.0 · Mars 2026 · **Confidentiel**

## 🎯 Vision
Transformer l'apprentissage de connaissances complexes. Trajectoire : **app de révision → plateforme d'éducation IA → système de productivité cognitive**. Le hub de référence pour analystes financiers en certification (CFA · FRM · CPA · CAIA).

Fondé sur les mêmes piliers que ce vault : [[Active Recall]], [[Spaced Repetition]], [[Cognitive Load Theory]], [[Dual Coding]].

## 🧩 Problème
Examens techniques denses, pression temporelle, barrière linguistique (candidats non-anglophones), et **aucun outil centralisé** combinant planification + révision intelligente + suivi de perf. Les solutions existantes (Kaplan Schweser, AnalystPrep) sont fragmentées et non adaptatives.

## 💎 Proposition de valeur (7 piliers)
Centralisation · IA Tuteur (LLM contextuel, langue maternelle) · Neuroscience (SM-2 étendu, interleaving) · Multilingue (Dual Language Mode) · Analytics cognitif (heatmap LOS, Digital Twin) · Gamification · Écosystème contenu (marketplace freelance + pipeline IA).

## 🗺️ Roadmap (Avr → Déc 2026)
| Phase | Durée | Livrable clé |
| --- | --- | --- |
| **P0 — Fondations** | 4 sem (Avr) | Auth multi-tenant, design system navy/gold, CI/CD |
| **P1 — MVP Analyste** | 8 sem (Mai–Juin) | Dashboard cockpit, QBank 3 modes, Flashcards SM-2, AI Tutor RAG, 3 pilotes |
| **P2 — Hub V1** | 10 sem (Juil–Sep) | Calendrier adaptatif, Knowledge Map, Dual Language, Gamification, Quantum Terminal V1 |
| **P3 — Scale global** | 12 sem (Oct–Déc) | Digital Twin, mobile RN, multi-certifs, fine-tuning LLaMA3 |

## ⚙️ 16 fonctions (extrait)
- **F01** Dashboard Cockpit `P0` · **F03** QBank & Mock `P0` · **F04** Flashcards SM-2 `P0` · **F06** AI Tutor LLM (RAG) `P0` · **F12** Analytics `P0` · **F13** Multi-users & SSO `P0` · **F15** RGPD `P0`
- **F02** Calendrier adaptatif · **F05** Knowledge Map · **F07** Dual Language · **F08** Gamification · **F09** Freelance Content Engine · **F10** Fiches PDF bilingues · **F11** TTS multilingue · **F16** [[Quantum Terminal]]
- **F14** Digital Twin Cognitif `P2`

## 🏗️ Stack (résumé)
- **Front** : React 18 + Next.js 14, Tailwind, Zustand + React Query
- **Back** : Python FastAPI (async, Pydantic v2), PostgreSQL 16 + Redis 7
- **IA** : Ollama + LLaMA3 8B/70B, RAG (chunks 512/overlap 128 → nomic-embed-text → ChromaDB/Qdrant), TTS Edge + Kokoro
- **Infra** : Docker + K8s, GitHub Actions + ArgoCD, Grafana/Prometheus/Sentry

## 💰 Modèle éco
Freemium → Premium 10€ → Premium+ 25€ (Quantum Terminal) → Institutionnel 25–50€/siège. **ARR Y1 estimé : ~202 000 €**.

## ✅ Prochaines actions
- [ ] Valider les critères d'acceptance MVP (AI Tutor ≥ 90 % sur CFA L1, rétention flashcards > 75 % à J+30)
- [ ] Prototyper le pipeline RAG sur le curriculum CFA L1
- [ ] Recruter 3 clients pilotes (pilote 90 j gratuit)

## 🔗 Liens
- Sous-module : [[Quantum Terminal]]
- Produit associé : [[Wingman v2]]
- Cas d'usage perso : [[CFA Level 1]]
- Domaines : [[Finance & Investing]] · [[Software & Product]] · [[Learning & Productivity]]

> [!info] Sources
> Drive : `CognisIA_CDC_v3.0.docx`, `cognisai_product_vision.pptx`, `cognisai_storytelling_deck.pptx`.
