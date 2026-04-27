import { useState } from "react";

export const useRequestUpdate = (setRefreshProducts) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [currentEditingId, setCurrentEditingId] = useState(null);
  
  
  const requestUpdate = (todoID) => {
    setIsUpdating(true);

    fetch(`http://localhost:3000/todos/${todoID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: editedText,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("Задача обновлена:", response);
        setRefreshProducts(prev => !prev);
      })
      .finally(() => {
        (setIsUpdating(false), setEditedText(""), setCurrentEditingId(null));
      });
  };
  
  return {
    isUpdating,
    editedText,
    setEditedText,
    currentEditingId,
    setCurrentEditingId,
    requestUpdate,
  };
};