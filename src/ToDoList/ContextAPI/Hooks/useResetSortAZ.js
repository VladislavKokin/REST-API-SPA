export const useResetSortAZ = (isToDoList, setFilteredList) => {
  const resetSortAZ = () => {
    setFilteredList(isToDoList);
  };
  return {
    resetSortAZ
  };
};