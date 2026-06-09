import { actions } from "../Store/actions";

export const resetSortAZ = (dispatch, getState) => {
  const { isToDoList } = getState();
    dispatch(actions.setFilteredList(isToDoList));
  };
