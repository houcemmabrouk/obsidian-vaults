# Magpie — Android MVP

A one-screen mobile companion. The whole point of this build is to answer a single question: **does the voice land?** Everything else (social graph, écrin, scraping, the pro app) is deliberately left out. If people reopen it just to talk, you have a product. If they don't, no feature would have saved it.

## What's in the box

- Single streaming chat, Magpie's personality baked in.
- Local memory — the whole conversation persists on-device and reloads on launch, so Magpie feels like it remembers you across sessions.
- Typing indicator + live streaming of each reply.
- API key stored in the device secure store, entered once on first launch.

The soul of the app is one file: `src/voice.ts`. That string is what you tune. The rest is a shell.

## Run it (Android)

Prerequisites: Node 18+, a phone with Expo Go installed (Play Store), and an Anthropic API key from https://console.anthropic.com/settings/keys

```bash
cd magpie-mvp
npm install
npx expo install --fix   # aligns native deps to the installed Expo SDK
npx expo start
```

Scan the QR code with Expo Go on your Android phone. On first launch, paste your `sk-ant-...` key. Talk to it.

Note: `expo-secure-store` works in Expo Go on Android. If you later move to a custom dev build, run `npx expo prebuild` and `npx expo run:android`.

## Ship a real APK to testers (TestFlight-style for Android)

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview   # produces an installable .apk
```

Share the build link. Testers install, paste a key, and you're collecting real reactions.

## Tune the voice

Open `src/voice.ts`, rewrite the character, save, reload the app. That's the whole loop. Ship variants to different tester cohorts and watch which one they keep opening.

Model is set in `src/anthropic.ts` (`MODEL`). It defaults to `claude-opus-4-8` for the richest voice while you're testing whether it lands; switch to the current Sonnet string to cut cost once you scale.

## Honest limitations (read before you ship widely)

- The API key sits on the device. Fine for a controlled test cohort, not for public launch — a real release must proxy calls through your own backend so the key never ships in the app. This is the first thing to fix after the voice is proven.
- Memory is the raw transcript, windowed to the last 40 turns when calling the model. No summarization, no profile extraction yet — that's a v2 upgrade and it's where "it really knows me" will come from.
- No push, no proactive nudges. On purpose. The notification that says "I signed you up for salsa, Thursday 7pm" is the real magic, but it's v2 — first prove the voice in a plain chat.
- iOS works from the same code (`npx expo run:ios`), but Android is the chosen first surface.

## Structure

```
magpie-mvp/
├── App.tsx            # setup screen + chat UI, streaming, persistence
├── index.js           # entry point
├── app.json           # Expo config, Android package id
├── package.json
├── src/
│   ├── voice.ts       # ← the product. Magpie's personality.
│   ├── anthropic.ts   # Messages API client, XHR/SSE streaming
│   ├── storage.ts     # SecureStore key + AsyncStorage transcript
│   └── theme.ts       # dark premium tokens
└── README.md
```
