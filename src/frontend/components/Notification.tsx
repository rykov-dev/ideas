import React from "react";
import { useNotificationState } from "../hooks/useNotification";

export function Notification() {
   const { message, visible, type } = useNotificationState();

   if (!visible) return null;

   const className = `notification notification--${type}`;

   return (<section className={className} role="status" aria-live={type === 'error' ? 'assertive' : 'polite'}>
      {message}
   </section>);
}