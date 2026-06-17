export const requestAdd = (isInput) => async (dispatch) => {
  if (!isInput.trim()) return;

  try {
    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: isInput,
      }),
    })
    const data = await response.json();
    console.log("Задача добавлена: ", data);
    dispatch({ type: 'ADD_TODO_FULFILLED', payload: data })
  } catch (error) {
    console.error('Error:', error);
  }
}