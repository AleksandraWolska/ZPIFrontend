export const shouldShowEnd = (start: string, end: string | undefined) => {
  if (!end) return false;
  return start !== end;
};
