import { useState, useEffect } from "react";

export const useTodosLoader = () => {
  const [isToDoList, setIsToDoList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshProductsFlag, setRefreshProductsFlag] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch("http://localhost:3000/todos")
      .then((loadedData) => loadedData.json())
      .then((loadedList) => {
        setIsToDoList(loadedList);
        setFilteredList(loadedList);
      })
      .finally(() => setIsLoading(false));
  }, [refreshProductsFlag]);

  return {
    isToDoList,
    filteredList,
    isLoading,
    refreshProductsFlag,
    setRefreshProductsFlag,
    setFilteredList,
  };
};