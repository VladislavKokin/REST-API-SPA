import { actions } from '../Store/actions';

export const requestSortAZ = (dispatch, getState) => {
  const { filteredList } = getState();
  const sorted = [...filteredList].sort((a, b) =>
    a.title.localeCompare(b.title),
  );

  dispatch(actions.setFilteredList(sorted));
};
