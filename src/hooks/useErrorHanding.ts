import { useEffect } from 'react';
import { useErrorContext } from '../error-modules/ui-error-module/ErrorHandlingProvider';

export const useErrorHandling = (error: string | null) => {
  const { handleError } = useErrorContext();

  useEffect(() => {
    if (!!error) handleError(error);
  }, [error]);
};
