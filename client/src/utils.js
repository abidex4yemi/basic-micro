export const formatToShortDate = (dateString) => {
  const date = new Date(dateString);

  const stringDate = date.toDateString();

  const dateArray = stringDate.split(' ');
  return `${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`;
};
