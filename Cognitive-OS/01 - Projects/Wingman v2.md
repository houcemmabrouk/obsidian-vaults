---
tags: [project, ai, product, learning]
created: 2026-07-18
status: active
aliases: [Wingman, Wingman v2]
---

# 🎧 Wingman v2 — AI-Powered CFA Learning OS

> *Ceci n'est PAS une app de prise de notes. Ceci n'est PAS une plateforme de cours. C'est un **Learning Operating System (LOS)**.*

## 🎯 Objectif
Concevoir et construire un système d'apprentissage IA centré sur la **maîtrise du CFA Level 1** (scope initial), scalable à toute certification. Optimisé pour **performance, rétention et réussite à l'examen**.

## 🧩 Philosophie — 4 piliers cognitifs
1. [[Active Recall]] > apprentissage passif
2. [[Spaced Repetition]]
3. **Exam-Oriented Thinking**
4. [[Cognitive Load Theory|Cognitive Load Optimization]]

## 🏛️ Architecture système (5 moteurs)
| Moteur | Rôle |
| --- | --- |
| **EIDOLON** (Data Layer) | Normalise tout le contenu en schéma unifié (module, LM, LOS, type, difficulté, importance, tags, langue) |
| **COGNIS** (Content Engine) | Auto-génère par LM : Essential Sheet, LOS Sheet, Exam Traps, Decision Tree, Concept-on-Concept, Audio Script 20 min, QBank |
| **PRISM** (Session Engine) | Warmup → Learn → Test → Stress Test → Consolidation |
| **REVELIS** (Progression) | Mastery Score, accuracy/LOS, vitesse, retention decay, weakness clusters |
| **WINGMAN CORE** (AI Coach) | Teacher · Motivator · Analyst — détecte faiblesses, adapte difficulté, plan quotidien, rapport de session |

## 🧮 Formule Mastery
```
Mastery = (Accuracy × 0.5) + (Retention × 0.3) + (Speed × 0.2)
```

## 🖥️ Frontend (React / Next.js)
Dashboard (plan du jour, faiblesses) · Study Session (focus mode) · Library (Module → LM → types, export PDF/audio/sheets) · Progress (heatmap mastery, tracking LOS).
**UI/UX** : dark mode first, high contrast Bloomberg-style, minimaliste, focus-driven.

## ⚙️ Backend (Python / Django Ninja)
Content Generator (LLM) · Progress Tracker · Session Engine API · Recommendation Engine. DB : SQLite (MVP) → PostgreSQL (scale).

## 🔥 Features spéciales
- **Rogue Audit Mode** — détecte réponses illogiques, surconfiance, patterns d'erreur.
- **Nexora Audio** — leçons vocales auto-générées ([[Dual Coding]], révision passive).
- **Quantum Bridge** (futur) — injecte des données de marché réelles dans les questions (cf. [[Quantum Terminal]]).

## ✅ Priorités MVP
1. Session Engine · 2. LOS Generator · 3. Dashboard basique · 4. Progress tracking manuel.
**Ne PAS construire** : features sociales, gamification excessive, onboarding complexe.

## 🔗 Liens
- Évolution / hub : [[CognisAI (Learning OS)]]
- Application perso : [[CFA Level 1]]
- Domaines : [[Learning & Productivity]] · [[Software & Product]]

> [!info] Source
> Drive : `CLAUDE_Wingman_v2.md`.
