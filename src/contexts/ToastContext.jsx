import { createContext, useContext } from 'react';
import { toast } from 'sonner';

const ToastContext = createContext({
  showSuccess: (message) => {},
  showError: (message) => {},
});

export const ToastProvider = ({ children }) => {
  const showSuccess = (message) => {
    toast.success(message, {
      position: 'top-center',
      duration: 3000,
      style: {
        background: '#4ade80',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        padding: '12px 20px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
    });
  };

  const showError = (message) => {
    toast.error(message, {
      position: 'top-center',
      duration: 3000,
      style: {
        background: '#f87171',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        padding: '12px 20px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
    });
  };

  return (
    <ToastContext.Provider value={{ showSuccess, showError }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
