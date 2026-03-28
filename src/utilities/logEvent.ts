const FRONTEND_SECRET = import.meta.env.VITE_FRONTEND_SECRET ?? 'unset';

export type EventType = 'suggestion_click' | 'chat_submit' | 'decision_submit' | 'task_load';

export function logEvent(
  endpoint: string,
  sessionId: string,
  eventType: EventType,
  taskId?: string,
  payload?: Record<string, unknown>,
): void {
  fetch(`${endpoint}/event`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Frontend-Secret': FRONTEND_SECRET,
    },
    body: JSON.stringify({
      session_id: sessionId,
      event_type: eventType,
      task_id: taskId ?? null,
      payload: payload ?? {},
      timestamp: new Date().toISOString(),
    }),
  }).catch(() => { /* fire-and-forget */ });
}
