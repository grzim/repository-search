import { useEffect } from 'react';
import { useErrorContext } from '@errors-ui/ErrorHandlingProvider';
import { ToVoid } from '@src/utils';

export const useWithErrorHandling = <
  P extends Record<string, unknown> & {
    error: string | null;
    clearError: ToVoid;
  },
>(
  props: P,
): P => {
  const error = props.error;
  const { handleError } = useErrorContext();

  useEffect(() => {
    props.clearError();
    if (!!error) handleError(error);
  }, [error, handleError]);
  return props;
};
