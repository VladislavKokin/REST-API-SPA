import { actions } from "../Store/actions";

export const resetSearch = (dispatch, getState) => {
  const { isToDoList } = getState();
  dispatch(actions.setSearchValue(""));
  dispatch(actions.setFilteredList(isToDoList));
};
