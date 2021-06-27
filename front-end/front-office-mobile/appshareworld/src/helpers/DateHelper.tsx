const getNumberOfDays = (date: string) => {
  var date1 = new Date(date).getTime();
  var date2 = Date.now();
  const diff = Math.floor((date2 - date1) / 1000 / 60 / 60 / 24);

  if (diff == 0) {
    return "Auj";
  }

  return diff <= 1 ? `${diff} jour` : `${diff} jours`;
};

export const DateHelper = { getNumberOfDays };
