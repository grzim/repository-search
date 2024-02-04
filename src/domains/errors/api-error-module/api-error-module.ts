export const logAPIError = ({
  fnName,
  error,
}: {
  fnName: string;
  error: unknown;
}) => {
  const message = error instanceof Error ? error : `unknown`;
  const now = new Date();
  const dateString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, `0`)}-${String(now.getDate()).padStart(2, `0`)}`;
  const timeString = `${String(now.getHours()).padStart(2, `0`)}:${String(now.getMinutes()).padStart(2, `0`)}:${String(now.getSeconds()).padStart(2, `0`)}`;
  const messageToLog = `[${dateString} ${timeString}] in ${fnName}: ${message}`;
  console.error(messageToLog);
};

// eslint-disable-next-line
export const withErrorLog = <A extends (x: any) => Promise<any>>(fn: A): A => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return (...x) =>
    fn(...x).catch((error: unknown) => {
      logAPIError({
        fnName: fn.name,
        error: error,
      });
      throw error;
    }) as unknown as A;
};
