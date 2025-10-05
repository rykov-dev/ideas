import { useEffect, useRef, useState } from 'react';

type NotificationType = 'success' | 'error' | 'info';
type NotificationPayload = { message: string | null, type: NotificationType };
type Listener = (payload: NotificationPayload) => void;
const listeners = new Set<Listener>();

function emit(payload: NotificationPayload) {
   listeners.forEach((l) => l(payload));
}

export function useNotification() {
   const show = (message: string) => emit({ message, type: 'info' });
   const showError = (err: unknown) => {
      const msg = err instanceof Error ? err.message : String(err ?? 'Error');
      emit({ message: msg, type: 'error' });
   };
   const showSuccess = (message: string) => emit({ message, type: 'success' });
   const clear = () => emit({ message: null, type: 'info' });

   return { show, showError, showSuccess, clear };
}

export function useNotificationState(autoHideMs: number = 3000) {
   const [message, setMessage] = useState<string | null>(null);
   const [type, setType] = useState<NotificationType>('info');
   const timerRef = useRef<number | null>(null);

   useEffect(() => {
      const listener: Listener = (payload) => {
         setMessage(payload.message);
         setType(payload.type);
      };
      listeners.add(listener);
      return () => {
         listeners.delete(listener);
      };
   }, []);

   useEffect(() => {
      if (!message) return;
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setMessage(null), autoHideMs);
      return () => {
         if (timerRef.current) window.clearTimeout(timerRef.current);
      };
   }, [message, autoHideMs]);

   return { message, visible: Boolean(message), type };
}