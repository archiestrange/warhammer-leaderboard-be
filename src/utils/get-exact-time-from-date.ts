export const getExactTimeFromDate = (value: string | Date) => {
  return new Date(new Date(value)).getTime().toString();
};
