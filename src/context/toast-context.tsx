/* eslint-disable react/prop-types */
import { createContext, useContext, useRef } from "react";
import { Toast } from "primereact/toast";

type severity =
  | "success"
  | "info"
  | "warn"
  | "error"
  | "secondary"
  | "contrast"
  | undefined;

interface ToastContextProps {
  show: (severity: severity, summary: string, detail: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const toast = useRef<Toast>(null);

  const show = (severity: severity, summary: string, detail: string) => {
    if (toast.current) {
      toast.current.show({ severity, summary, detail, life: 3000 });
    }
  };

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <Toast ref={toast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
