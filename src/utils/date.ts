export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // getUTCMonth() is zero-based
  const year = date.getUTCFullYear().toString();

  return `${day}/${month}/${year}`;
};
