import { useEffect, type ReactElement } from "react";
import { type ToastEntity, useToastContext } from "../../contexts/ToastContext";
import "./Toast.css";

export function Toast({ toast }: { toast: ToastEntity }): ReactElement {
  const { aliveToasts, killToast, deleteToast } = useToastContext();

  function getColorClass(): string {
    switch (toast.type) {
      case 'success': return 'toast-success-color';
      case 'information': return 'toast-information-color';
      case 'warning': return 'toast-warning-color';
      case 'error': return 'toast-error-color';
    };
  }

  useEffect(() => {
    // set timer to remove this toast as soon as it's visible
    setTimeout(() => killToast(toast), toast.timeToLive);
  }, []);

  useEffect(() => {
    // kill this toast if it's the oldest one and there are more than 3 active toasts
    if (aliveToasts[0] === toast && aliveToasts.length > 3) killToast(toast);
  }, [aliveToasts]);

  function onTransitionEnd() {
    // delete this toast from the list as soon as it's exit animation is done
    if (!toast.alive) deleteToast(toast);
  }

  return (
    <div
      className={`toast-wrapper${toast.alive ? '' : ' toast-dead'}`}
      onTransitionEnd={onTransitionEnd}
    >
      <div className={`toast-content ${getColorClass()}`}>
        {toast.message}
      </div>
    </div>
  );
}