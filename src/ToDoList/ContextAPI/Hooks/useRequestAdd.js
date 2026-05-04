import { useState } from "react";

export const useRequestAdd = (setTodos, setRefreshProducts) => {
  const [isInput, setIsInput] = useState("");
  const [isCreating, setIsCreating] = useState(false);

    const requestAdd = () => {
    if (!isInput.trim()) return;

    setIsCreating(true);

    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: isInput,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("Ответ сервера:", response);
        setTodos((prevTodos) => [response, ...prevTodos]);
        setRefreshProducts(prev => !prev);
      })
      .finally(() => {
        (setIsCreating(false), setIsInput(""));
      });
  };

  return {
    isInput,
    setIsInput,
    isCreating,
    requestAdd,
  };
};