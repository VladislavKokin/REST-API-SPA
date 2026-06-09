import { actions } from '../Store/actions';

export const requestAdd = () => async (dispatch, getState) => {
  const { isInput, isToDoList } = getState();
  if (!isInput.trim()) return;

  dispatch(actions.setIsCreating(true));

  try {
    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: isInput,
      }),
    })
    const data = await response.json();
    const newList = [data, ...isToDoList];
    dispatch(actions.setIsToDoList(newList));
    dispatch(actions.setFilteredList(newList));
  } catch (error) {
    console.error('Error:', error);
  }
  finally {
    dispatch(actions.setIsCreating(false));
    dispatch(actions.setIsInput(''));
  }
}