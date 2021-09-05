export const fixDate = (date) => {
  const fixedDate = new Date(date);
  return fixedDate.toString().split(" GMT")[0].slice(0, -3);
};
