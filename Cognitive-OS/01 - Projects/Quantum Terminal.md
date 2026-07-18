---
tags: [project, ai, product, finance]
created: 2026-07-18
status: active
aliases: [Quantum Terminal]
---

# 🌐 Quantum Terminal — Module Données de Marché

> Sous-module de [[CognisAI (Learning OS)]] (fonction **F16**). Transforme la plateforme de simple outil de révision en **terminal de travail** pour l'analyste — le pont entre théorie certifiante et pratique de marché.

## Positionnement
Là où les concurrents proposent des cas pratiques sur **données fictives**, Quantum Terminal ancre chaque exercice dans les **marchés du jour** (yields réels, spreads live, courbes de taux actuelles).

## Sources API (8 agrégées)
| Source | Données | Usage |
| --- | --- | --- |
| FMP | Actions, bilans, DCF, ratios | Fondamentaux & screening |
| Finnhub | Prix temps réel, news, earnings | Flux temps réel (WebSocket) |
| Twelve Data | OHLCV, indicateurs techniques | Charting & signaux |
| Marketaux | News + sentiment NLP | Analyse sentiment |
| EODHD | 7 040 tickers, historique | Large coverage |
| FRED | Taux, macro USA | Contexte macro |
| BCE / Eurostat | Taux EUR, zone euro | Macro Europe |
| OpenFIGI | ISIN/CUSIP/FIGI | Résolution identifiants cross-source |

## Fonctionnalités
- **Prix temps réel** — OHLCV actions/oblig/ETF, sparklines dans les fiches, watchlist, alertes.
- **Screener obligataire / crédit HY** — filtres rating, spread OAS, duration, YTM, secteur ; *Covenant Quality Score* propriétaire ; export → flashcards crédit.
- **Macro (FRED + BCE)** — Fed Funds, CPI, courbe 2Y-10Y-30Y, alertes FOMC/CPI/NFP.
- **News & sentiment (Marketaux)** — flux filtré par univers, score NLP, lien news ↔ fiche CFA/FRM.

## Architecture
API Gateway unifiée (clés jamais exposées client) · Cache Redis (temps réel 15s / macro 1h / news 5min → –80 % d'appels) · WebSocket broker Finnhub → FastAPI → React · rate limiting multi-source · offline graceful.

## Impact éco
Justifie le tier **Premium+ (25€)**. Coût infra API ~0,12 €/user actif/jour → marge positive dès Premium.

## 🔗 Liens
- Parent : [[CognisAI (Learning OS)]]
- Domaines : [[Finance & Investing]] · [[Software & Product]]
