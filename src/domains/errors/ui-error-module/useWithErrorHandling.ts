import { useEffect } from 'react';
import { useErrorContext } from '@errors-ui/ErrorHandlingProvider';

export const useWithErrorHandling = <
  P extends Record<string, unknown> & {
    error: string | null;
  },
>(
  props: P,
): P => {
  const error = props.error;
  const { handleError } = useErrorContext();

  useEffect(() => {
    if (!!error) handleError(error);
  }, [error]);
  return props;
};
