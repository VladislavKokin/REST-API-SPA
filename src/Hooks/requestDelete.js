export const requestDelete = (todoID) => async (dispatch) => {

  try {
    const response = await fetch(`http://localhost:3000/todos/${todoID}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log('Ответ сервера: ', data);
    
    if (response.ok) {
      dispatch({ type: 'DELETE_TODO_FULFILLED', payload: { id: todoID } })
    } else {
      throw new Error('Ошибка при удалении.')
    };
  } catch (Error) {
    console.error('Error:', Error);
    dispatch({ type: 'DELETE_TODO_REJECTED', payload: Error});
  }
}