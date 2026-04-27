import { useState } from "react";

export const useRequestDelete = (setRefreshProducts) => {
  const [isDeleting ,setIsDeleting] = useState(false);

const requestDelete = (todoID) => {
    setIsDeleting(true);

    fetch(`http://localhost:3000/todos/${todoID}`, {
            method: 'DELETE',
        })
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                console.log('Ответ сервера: ', response);
                setRefreshProducts(prev => !prev);
            })
            .finally(() => setIsDeleting(false));
  };
  
  return { isDeleting, requestDelete };
};