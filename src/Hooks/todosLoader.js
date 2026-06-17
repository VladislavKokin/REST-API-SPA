export const loadTodos = () => async (dispatch) => {
    dispatch({ type: 'TODOS_PENDING' })

    try {
      const response = await fetch("http://localhost:3000/todos")
      const loadedList = await response.json();

      dispatch({ type: 'TODOS_FULFILLED', payload: loadedList })
    } catch (error) {
      console.error('Error:', error);
    };
};

// npx json-server --watch src/db.json
