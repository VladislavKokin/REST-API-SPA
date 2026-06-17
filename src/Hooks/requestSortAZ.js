export const requestSortAZ = () => (dispatch, getState) => {
  const todos = getState().todos;
  dispatch({ type: "SORT_AZ_TODO_PENDING" })

  const sorted = [...todos].sort((a, b) =>
    a.title.localeCompare(b.title),
  );

  dispatch({ type: 'SORT_AZ_TODO_FULFILLED', payload:  sorted});
};
