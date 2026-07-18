import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

// ── API key ──────────────────────────────────────────────────────────────────
// Lives in the device secure store (Keychain / Keystore), never in plain storage.
// Entered once on first launch. For a controlled test cohort only — a public
// release must proxy through a backend so the key never ships on-device.

const KEY_SLOT = 'magpie_anthropic_api_key';

export async function getApiKey(): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(KEY_SLOT);
  } catch {
    return null;
  }
}

export async function setApiKey(key: string): Promise<void> {
  await SecureStore.setItemAsync(KEY_SLOT, key.trim());
}

export async function clearApiKey(): Promise<void> {
  await SecureStore.deleteItemAsync(KEY_SLOT);
}

// ── Transcript ───────────────────────────────────────────────────────────────
// The whole conversation persists on-device and reloads on launch, so Magpie
// feels like it remembers you across sessions.

export type Role = 'user' | 'assistant';

export interface Message {
  id: string;
  role: Role;
  content: string;
}

const TRANSCRIPT_SLOT = 'magpie_transcript_v1';

export async function loadTranscript(): Promise<Message[]> {
  try {
    const raw = await AsyncStorage.getItem(TRANSCRIPT_SLOT);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveTranscript(messages: Message[]): Promise<void> {
  try {
    await AsyncStorage.setItem(TRANSCRIPT_SLOT, JSON.stringify(messages));
  } catch {
    // Best-effort. A dropped write just means one turn isn't persisted.
  }
}

export async function clearTranscript(): Promise<void> {
  await AsyncStorage.removeItem(TRANSCRIPT_SLOT);
}
