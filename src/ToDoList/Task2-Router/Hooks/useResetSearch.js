export const useResetSearch = (isToDoList, setSearchValue, setFilteredList) => {
  const resetSearch = (isToDoList) => {
    setSearchValue("");
    setFilteredList(isToDoList);
  };
  return {
    resetSearch
  }
};