import { loadTodos } from "./todosLoader";

export const resetRequest = () => (dispatch) => {
  dispatch(loadTodos());
};
