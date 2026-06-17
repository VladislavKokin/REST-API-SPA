export const requestSearch = (searchValue) => (dispatch, getState) => {
  const todos = getState().todos;
  dispatch({ type: "SEARCH_TODO_PENDING" })

  const result = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchValue.toLowerCase())
);
  console.log("Задачи найдены: ", result);

  dispatch({ type: 'SEARCH_TODO_FULFILLED', payload: result });
};
