import { type ReactElement } from "react";
import { useToastContext } from "../../contexts/ToastContext";
import { Toast } from "./Toast";
import './ToastController.css';

export function ToastDisplay(): ReactElement {
  const { allToasts } = useToastContext();

  return (
    <div className="toast-display">
      {allToasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  )
}

