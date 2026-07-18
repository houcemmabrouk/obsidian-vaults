import type { Message } from './storage';

// ─────────────────────────────────────────────────────────────────────────────
//  Anthropic Messages API client with live SSE streaming.
//
//  React Native's fetch doesn't expose a readable stream body in Expo Go, so we
//  drive the stream by hand with XMLHttpRequest and parse the Server-Sent Events
//  off responseText as it grows. Each text_delta is handed to onDelta the moment
//  it lands, which is what makes the reply type out live.
// ─────────────────────────────────────────────────────────────────────────────

// The model. Defaults to Opus for the richest voice while you're testing whether
// it lands; switch to the current Sonnet string to cut cost once you scale.
export const MODEL = 'claude-opus-4-8';

const ENDPOINT = 'https://api.anthropic.com/v1/messages';
const API_VERSION = '2023-06-01';
const MAX_TOKENS = 1024;

// Only the last N turns are sent to the model. The full transcript still lives
// on-device — this is just the context window we pay for on each call. No
// summarization yet; that's the v2 upgrade where "it really knows me" comes from.
const CONTEXT_WINDOW_TURNS = 40;

export interface StreamHandlers {
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (err: Error) => void;
}

/**
 * Stream one assistant reply. Returns an abort function.
 */
export function streamReply(
  apiKey: string,
  system: string,
  history: Message[],
  handlers: StreamHandlers,
): () => void {
  const { onDelta, onDone, onError } = handlers;

  const messages = history
    .slice(-CONTEXT_WINDOW_TURNS)
    .map((m) => ({ role: m.role, content: m.content }));

  const xhr = new XMLHttpRequest();
  xhr.open('POST', ENDPOINT);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.setRequestHeader('x-api-key', apiKey);
  xhr.setRequestHeader('anthropic-version', API_VERSION);
  // Lets the request through when the runtime looks like a browser to the SDK.
  xhr.setRequestHeader('anthropic-dangerous-direct-browser-access', 'true');

  let consumed = 0; // chars of responseText already parsed
  let buffer = ''; // partial SSE frame carried between progress events
  let finished = false;

  const finishOnce = (fn: () => void) => {
    if (finished) return;
    finished = true;
    fn();
  };

  const handleEvent = (frame: string) => {
    // An SSE frame is a group of lines; we only care about the data: payload.
    for (const line of frame.split('\n')) {
      if (!line.startsWith('data:')) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === '[DONE]') continue;
      try {
        const evt = JSON.parse(payload);
        if (evt.type === 'content_block_delta' && evt.delta?.type === 'text_delta') {
          onDelta(evt.delta.text as string);
        } else if (evt.type === 'error') {
          finishOnce(() =>
            onError(new Error(evt.error?.message || 'Streaming error from API')),
          );
        }
      } catch {
        // A half-arrived JSON payload — safe to skip, the retry frame carries it.
      }
    }
  };

  const drain = (incoming: string) => {
    buffer += incoming;
    let sep: number;
    // SSE frames are separated by a blank line (\n\n).
    while ((sep = buffer.indexOf('\n\n')) !== -1) {
      const frame = buffer.slice(0, sep);
      buffer = buffer.slice(sep + 2);
      handleEvent(frame);
    }
  };

  xhr.onprogress = () => {
    if (xhr.status && xhr.status >= 400) return; // error body isn't SSE
    const fresh = xhr.responseText.slice(consumed);
    consumed = xhr.responseText.length;
    if (fresh) drain(fresh);
  };

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      const fresh = xhr.responseText.slice(consumed);
      if (fresh) drain(fresh);
      finishOnce(onDone);
    } else {
      let msg = `HTTP ${xhr.status}`;
      try {
        const err = JSON.parse(xhr.responseText);
        msg = err.error?.message || msg;
      } catch {
        if (xhr.responseText) msg = `${msg}: ${xhr.responseText.slice(0, 180)}`;
      }
      finishOnce(() => onError(new Error(msg)));
    }
  };

  xhr.onerror = () =>
    finishOnce(() =>
      onError(new Error('Network error — check your connection and try again.')),
    );

  xhr.send(
    JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system,
      stream: true,
      messages,
    }),
  );

  return () => {
    finished = true;
    try {
      xhr.abort();
    } catch {
      // already done
    }
  };
}
