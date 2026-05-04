export const useRequestSortAZ = (filteredList, setFilteredList) => {
  const requestSortAZ = () => {
    const sorted = [...filteredList].sort((a, b) =>
      a.title.localeCompare(b.title),
    );

    setFilteredList(sorted);
  };
  return {
    requestSortAZ,
  };
};
