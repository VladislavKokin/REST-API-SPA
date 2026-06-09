import { actions } from "../Store/actions";

export const requestUpdate = (todoID) => async (dispatch, getState) => {
  dispatch(actions.setIsUpdating(true));
  try {
    const { editedText } = getState();
    // const editedText = getState().todos?.editedText || getState().editedText;
    const response = await fetch(`http://localhost:3000/todos/${todoID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: editedText,
      }),
    })
    const data = await response.json();
    console.log("Задача обновлена: ", data);
    dispatch(actions.updateTodo(todoID, data.title));
  }
  finally {
    dispatch(actions.setIsUpdating(false)), 
    dispatch(actions.setEditedText("")), 
    dispatch(actions.setCurrentEditingId(null));
  };
};