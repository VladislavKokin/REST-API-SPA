import { actions } from '../Store/actions';

export const requestSearch = () => (dispatch, getState) => {
  const { isToDoList, searchValue } = getState();
  const result = isToDoList.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase()),
  );
  dispatch(actions.setFilteredList(result));
};