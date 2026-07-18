import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { MODEL, streamReply } from './src/anthropic';
import {
  clearApiKey,
  clearTranscript,
  getApiKey,
  loadTranscript,
  Message,
  saveTranscript,
  setApiKey,
} from './src/storage';
import { theme } from './src/theme';
import { VOICE } from './src/voice';

let idCounter = 0;
const newId = () => `${Date.now()}-${idCounter++}`;

export default function App() {
  const [booting, setBooting] = useState(true);
  const [apiKey, setKey] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<(() => void) | null>(null);
  const listRef = useRef<FlatList<Message>>(null);

  // Load persisted state on launch.
  useEffect(() => {
    (async () => {
      const [key, transcript] = await Promise.all([getApiKey(), loadTranscript()]);
      setKey(key);
      setMessages(transcript);
      setBooting(false);
    })();
  }, []);

  // Persist the transcript whenever it settles.
  useEffect(() => {
    if (!booting) saveTranscript(messages);
  }, [messages, booting]);

  const scrollToEnd = useCallback(() => {
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  }, []);

  const send = useCallback(() => {
    const text = input.trim();
    if (!text || streaming || !apiKey) return;

    setError(null);
    setInput('');

    const userMsg: Message = { id: newId(), role: 'user', content: text };
    const assistantMsg: Message = { id: newId(), role: 'assistant', content: '' };
    const history = [...messages, userMsg];

    setMessages([...history, assistantMsg]);
    setStreaming(true);
    scrollToEnd();

    const appendToAssistant = (chunk: string) => {
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last && last.role === 'assistant') {
          next[next.length - 1] = { ...last, content: last.content + chunk };
        }
        return next;
      });
    };

    abortRef.current = streamReply(apiKey, VOICE, history, {
      onDelta: (chunk) => {
        appendToAssistant(chunk);
        scrollToEnd();
      },
      onDone: () => {
        setStreaming(false);
        abortRef.current = null;
        // Drop a reply that never produced any text.
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last && last.role === 'assistant' && last.content.length === 0) {
            return prev.slice(0, -1);
          }
          return prev;
        });
      },
      onError: (err) => {
        setStreaming(false);
        abortRef.current = null;
        setError(err.message);
        // Remove the empty assistant placeholder so the input is clean to retry.
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last && last.role === 'assistant' && last.content.length === 0) {
            return prev.slice(0, -1);
          }
          return prev;
        });
      },
    });
  }, [input, streaming, apiKey, messages, scrollToEnd]);

  const stop = useCallback(() => {
    abortRef.current?.();
    abortRef.current = null;
    setStreaming(false);
  }, []);

  const forget = useCallback(async () => {
    stop();
    await clearTranscript();
    setMessages([]);
    setError(null);
  }, [stop]);

  const signOut = useCallback(async () => {
    stop();
    await clearApiKey();
    setKey(null);
  }, [stop]);

  if (booting) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={theme.color.accent} />
        <StatusBar style="light" />
      </View>
    );
  }

  if (!apiKey) {
    return <Setup onSaved={setKey} />;
  }

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="light" />
      <Header
        onForget={forget}
        onSignOut={signOut}
        hasMessages={messages.length > 0}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
      >
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <FlatList
            ref={listRef}
            data={messages}
            keyExtractor={(m) => m.id}
            renderItem={({ item }) => <Bubble message={item} streaming={streaming} />}
            contentContainerStyle={styles.listContent}
            onContentSizeChange={scrollToEnd}
            keyboardDismissMode="interactive"
          />
        )}

        {streaming && <TypingHint />}
        {error && <ErrorBar text={error} />}

        <Composer
          value={input}
          onChange={setInput}
          onSend={send}
          onStop={stop}
          streaming={streaming}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ── First-launch setup ─────────────────────────────────────────────────────────

function Setup({ onSaved }: { onSaved: (key: string) => void }) {
  const [value, setValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const save = async () => {
    const key = value.trim();
    if (!key.startsWith('sk-ant-')) {
      setErr('That doesn’t look like an Anthropic key. It starts with sk-ant-');
      return;
    }
    setSaving(true);
    try {
      await setApiKey(key);
      onSaved(key);
    } catch {
      setErr('Couldn’t save the key to the secure store.');
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={[styles.flex, styles.setupWrap]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.mark}>Magpie</Text>
        <Text style={styles.setupLead}>
          Paste your Anthropic key to begin. It’s stored only on this device, in the
          secure store.
        </Text>

        <TextInput
          style={styles.keyInput}
          value={value}
          onChangeText={setValue}
          placeholder="sk-ant-..."
          placeholderTextColor={theme.color.textFaint}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          selectionColor={theme.color.accent}
        />

        {err && <Text style={styles.setupErr}>{err}</Text>}

        <Pressable
          style={({ pressed }) => [
            styles.primaryBtn,
            pressed && styles.pressed,
            !value.trim() && styles.btnDisabled,
          ]}
          onPress={save}
          disabled={!value.trim() || saving}
        >
          {saving ? (
            <ActivityIndicator color={theme.color.onAccent} />
          ) : (
            <Text style={styles.primaryBtnText}>Start talking</Text>
          )}
        </Pressable>

        <Text style={styles.setupNote}>
          Get a key at console.anthropic.com → Settings → API Keys
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ── Chrome ──────────────────────────────────────────────────────────────────────

function Header({
  onForget,
  onSignOut,
  hasMessages,
}: {
  onForget: () => void;
  onSignOut: () => void;
  hasMessages: boolean;
}) {
  return (
    <View style={styles.header}>
      <View style={styles.headerTitleRow}>
        <View style={styles.dot} />
        <Text style={styles.headerTitle}>Magpie</Text>
      </View>
      <View style={styles.headerActions}>
        {hasMessages && (
          <Pressable onPress={onForget} hitSlop={8}>
            <Text style={styles.headerAction}>Clear</Text>
          </Pressable>
        )}
        <Pressable onPress={onSignOut} hitSlop={8}>
          <Text style={styles.headerAction}>Key</Text>
        </Pressable>
      </View>
    </View>
  );
}

function EmptyState() {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyTitle}>Say something.</Text>
      <Text style={styles.emptySub}>
        Magpie remembers this conversation on your device, so it’ll pick up where
        you left off next time.
      </Text>
    </View>
  );
}

function Bubble({ message, streaming }: { message: Message; streaming: boolean }) {
  const isUser = message.role === 'user';
  const isEmptyAssistant = !isUser && message.content.length === 0;

  return (
    <View style={[styles.row, isUser ? styles.rowRight : styles.rowLeft]}>
      <View
        style={[
          styles.bubble,
          isUser ? styles.bubbleUser : styles.bubbleAssistant,
        ]}
      >
        {isEmptyAssistant && streaming ? (
          <Dots />
        ) : (
          <Text style={[styles.bubbleText, isUser && styles.bubbleTextUser]}>
            {message.content}
          </Text>
        )}
      </View>
    </View>
  );
}

function Dots() {
  return (
    <View style={styles.dotsRow}>
      <View style={styles.typingDot} />
      <View style={[styles.typingDot, styles.typingDotMid]} />
      <View style={styles.typingDot} />
    </View>
  );
}

function TypingHint() {
  return (
    <View style={styles.typingHint}>
      <Text style={styles.typingHintText}>Magpie is writing…</Text>
    </View>
  );
}

function ErrorBar({ text }: { text: string }) {
  return (
    <View style={styles.errorBar}>
      <Text style={styles.errorText}>{text}</Text>
    </View>
  );
}

function Composer({
  value,
  onChange,
  onSend,
  onStop,
  streaming,
}: {
  value: string;
  onChange: (t: string) => void;
  onSend: () => void;
  onStop: () => void;
  streaming: boolean;
}) {
  const canSend = value.trim().length > 0 && !streaming;
  return (
    <View style={styles.composer}>
      <TextInput
        style={styles.composerInput}
        value={value}
        onChangeText={onChange}
        placeholder="Message"
        placeholderTextColor={theme.color.textFaint}
        multiline
        selectionColor={theme.color.accent}
        onSubmitEditing={canSend ? onSend : undefined}
        blurOnSubmit={false}
      />
      {streaming ? (
        <Pressable
          style={({ pressed }) => [styles.sendBtn, styles.stopBtn, pressed && styles.pressed]}
          onPress={onStop}
        >
          <View style={styles.stopSquare} />
        </Pressable>
      ) : (
        <Pressable
          style={({ pressed }) => [
            styles.sendBtn,
            pressed && styles.pressed,
            !canSend && styles.btnDisabled,
          ]}
          onPress={onSend}
          disabled={!canSend}
        >
          <Text style={styles.sendArrow}>↑</Text>
        </Pressable>
      )}
    </View>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.color.bg },
  flex: { flex: 1 },
  center: {
    flex: 1,
    backgroundColor: theme.color.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Setup
  setupWrap: { paddingHorizontal: theme.space.xl, justifyContent: 'center' },
  mark: {
    color: theme.color.text,
    fontSize: theme.font.title,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginBottom: theme.space.md,
  },
  setupLead: {
    color: theme.color.textDim,
    fontSize: theme.font.body,
    lineHeight: 23,
    marginBottom: theme.space.xl,
  },
  keyInput: {
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.color.hairline,
    color: theme.color.text,
    fontSize: theme.font.body,
    paddingHorizontal: theme.space.lg,
    paddingVertical: theme.space.lg,
  },
  setupErr: {
    color: theme.color.danger,
    fontSize: theme.font.small,
    marginTop: theme.space.md,
  },
  setupNote: {
    color: theme.color.textFaint,
    fontSize: theme.font.small,
    textAlign: 'center',
    marginTop: theme.space.xl,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.space.lg,
    paddingVertical: theme.space.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.color.hairline,
  },
  headerTitleRow: { flexDirection: 'row', alignItems: 'center' },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.color.accent,
    marginRight: theme.space.sm,
  },
  headerTitle: {
    color: theme.color.text,
    fontSize: theme.font.body,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  headerActions: { flexDirection: 'row', gap: theme.space.lg },
  headerAction: { color: theme.color.textDim, fontSize: theme.font.small },

  // Empty
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.space.xxl,
  },
  emptyTitle: {
    color: theme.color.text,
    fontSize: 22,
    fontWeight: '600',
    marginBottom: theme.space.md,
  },
  emptySub: {
    color: theme.color.textFaint,
    fontSize: theme.font.small,
    lineHeight: 20,
    textAlign: 'center',
  },

  // List / bubbles
  listContent: { paddingHorizontal: theme.space.lg, paddingVertical: theme.space.lg },
  row: { marginVertical: theme.space.sm, flexDirection: 'row' },
  rowLeft: { justifyContent: 'flex-start' },
  rowRight: { justifyContent: 'flex-end' },
  bubble: { maxWidth: '86%', borderRadius: theme.radius.lg },
  bubbleUser: {
    backgroundColor: theme.color.bubbleUser,
    paddingHorizontal: theme.space.lg,
    paddingVertical: theme.space.md,
    borderBottomRightRadius: theme.radius.sm,
  },
  bubbleAssistant: { paddingVertical: theme.space.xs },
  bubbleText: {
    color: theme.color.text,
    fontSize: theme.font.body,
    lineHeight: 24,
  },
  bubbleTextUser: { color: theme.color.text },

  dotsRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  typingDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: theme.color.textFaint,
    marginRight: 5,
  },
  typingDotMid: { opacity: 0.6 },

  typingHint: { paddingHorizontal: theme.space.lg, paddingBottom: theme.space.xs },
  typingHintText: { color: theme.color.textFaint, fontSize: theme.font.tiny },

  // Error
  errorBar: {
    marginHorizontal: theme.space.lg,
    marginBottom: theme.space.sm,
    padding: theme.space.md,
    borderRadius: theme.radius.sm,
    backgroundColor: 'rgba(240,115,106,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(240,115,106,0.3)',
  },
  errorText: { color: theme.color.danger, fontSize: theme.font.small },

  // Composer
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: theme.space.md,
    paddingVertical: theme.space.sm,
    borderTopWidth: 1,
    borderTopColor: theme.color.hairline,
    gap: theme.space.sm,
  },
  composerInput: {
    flex: 1,
    maxHeight: 130,
    minHeight: 44,
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.color.hairline,
    color: theme.color.text,
    fontSize: theme.font.body,
    paddingHorizontal: theme.space.lg,
    paddingTop: theme.space.md,
    paddingBottom: theme.space.md,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.color.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendArrow: { color: theme.color.onAccent, fontSize: 20, fontWeight: '800' },
  stopBtn: { backgroundColor: theme.color.surfaceRaised },
  stopSquare: {
    width: 14,
    height: 14,
    borderRadius: 3,
    backgroundColor: theme.color.text,
  },

  // Buttons
  primaryBtn: {
    marginTop: theme.space.xl,
    height: 52,
    borderRadius: theme.radius.md,
    backgroundColor: theme.color.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: theme.color.onAccent,
    fontSize: theme.font.body,
    fontWeight: '700',
  },
  btnDisabled: { opacity: 0.4 },
  pressed: { opacity: 0.7 },
});
