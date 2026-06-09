import { actions } from "../Store/actions";

export const loadTodos = () => async (dispatch) => {

    dispatch(actions.setIsLoading(true));

    try {
      const response = await fetch("http://localhost:3000/todos")
      const loadedList = await response.json();

      dispatch(actions.setIsToDoList(loadedList))
      dispatch(actions.setFilteredList(loadedList))
    } catch (error) {
      console.error('Error:', error);
    } finally { dispatch(actions.setIsLoading(false)) };
};
