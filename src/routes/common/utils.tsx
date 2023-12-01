export const shouldShowEnd = (start: string, end: string | undefined) => {
  if (!end) return false;
  if (start !== end) return true;
  return false;
};
