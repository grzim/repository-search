import { useEffect } from 'react';
import { useErrorContext } from './ErrorHandlingProvider';

export const useErrorHandling = (error: string | null) => {
  const { handleError } = useErrorContext();

  useEffect(() => {
    if (!!error) handleError(error);
  }, [error]);
};
