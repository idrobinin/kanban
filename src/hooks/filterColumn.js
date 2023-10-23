export const filterColumn = (column, cardId) => {
  return column.cards.filter((el) => el.id != cardId);
};
