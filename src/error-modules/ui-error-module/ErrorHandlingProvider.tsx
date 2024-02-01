import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import Alert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { alertAutoHideDuration } from './config';

const ErrorHandlingContext = createContext({
  handleError: console.error,
});

export const useErrorHandling = () => useContext(ErrorHandlingContext);

export const ErrorHandlingProvider = ({ children }: PropsWithChildren) => {
  const [error, setError] = useState<string | null>(null);
  const [severity, setSeverity] = useState<AlertProps['severity']>('error');

  const handleError = (
    errorMessage: string,
    errorSeverity: AlertProps['severity'] = 'error',
  ) => {
    setError(errorMessage);
    setSeverity(errorSeverity);
  };

  const handleClose = () => {
    setError(null);
  };

  return (
    <ErrorHandlingContext.Provider value={{ handleError }}>
      {children}
      <Snackbar
        open={!!error}
        autoHideDuration={alertAutoHideDuration}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </ErrorHandlingContext.Provider>
  );
};
