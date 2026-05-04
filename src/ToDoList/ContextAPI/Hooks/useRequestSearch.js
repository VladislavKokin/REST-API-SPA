import { useState } from "react";

export const useRequestSearch = (isToDoList, setFilteredList) => {
  const [searchValue, setSearchValue] = useState("");
  const requestSearch = () => {
    const result = isToDoList.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );

    setFilteredList(result);
  };
  return {
    searchValue,
    requestSearch,
    setSearchValue,
  };
};
