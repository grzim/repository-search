export const logAPIError = ({
  fnName,
  error,
}: {
  fnName: string;
  error: unknown;
}) => {
  const message = error instanceof Error ? error : 'unknown';
  const now = new Date();
  const dateString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  const messageToLog = `[${dateString} ${timeString}] in ${fnName}: ${message}`;
  console.error(messageToLog);
};
