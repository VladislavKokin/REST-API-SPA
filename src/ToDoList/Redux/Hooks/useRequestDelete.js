import { actions } from "../Store/actions";

export const requestDelete = (todoID) => async (dispatch, getState) => {
  dispatch(actions.setIsDeleting(true));

  try {
    const response = await fetch(`http://localhost:3000/todos/${todoID}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log('Ответ сервера: ', data);

    const { isToDoList, filteredList } = getState();
    const newToDoList = isToDoList.filter((item) => item.id !== todoID);
    const newFilteredList = filteredList.filter((item) => item.id !== todoID);

    dispatch(actions.setIsToDoList(newToDoList));
    dispatch(actions.setFilteredList(newFilteredList));
  } catch (error) {
    console.error('Error:', error);
  } finally { dispatch(actions.setIsDeleting(false)) };
}