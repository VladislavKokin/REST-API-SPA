import { actions } from "../store/actions";

export const requestUpdate = (todoID, editedText) => async (dispatch) => {
  dispatch(actions.setIsUpdating(true));
  try {
    const response = await fetch(`http://localhost:3000/todos/${todoID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: editedText,
      }),
    })
    const data = await response.json();
    console.log("Задача обновлена: ", data);
    dispatch({ type: 'UPDATE_TODO_FULFILLED', payload: data })
  }
  finally {
    dispatch(actions.setIsUpdating(false));
    dispatch(actions.setCurrentEditingId(null));
  };
};