import styles from '../../ToDoList/toDoList.module.css'
import { TasksContext } from './TasksContext/TasksContext';
import {
  useTodosLoader,
  useRequestAdd,
  useResetSortAZ,
  useResetSearch,
  useRequestSortAZ,
  useRequestSearch,
  useRequestUpdate,
  useRequestDelete,
} from "./Hooks";

const Todos = () => {
  const { isToDoList, filteredList, isLoading, refreshProductsFlag } = useTodosLoader();
  const { isInput, setIsInput, isCreating, requestAdd } = useRequestAdd();
  const { isUpdating, editedText, setEditedText, currentEditingId, setCurrentEditingId, requestUpdate } = useRequestUpdate();
  const { isDeleting, requestDelete } = useRequestDelete();
  const { searchValue, setSearchValue, requestSearch } = useRequestSearch(isToDoList, filteredList);
  const { resetSearch } = useResetSearch(isToDoList, setSearchValue, filteredList);
  const { requestSortAZ } = useRequestSortAZ(filteredList, filteredList);
  const { resetSortAZ } = useResetSortAZ(isToDoList, filteredList);

  const contextValue = {
    isToDoList,
    filteredList,
    isLoading,
    refreshProductsFlag,
    isInput,
    setIsInput,
    isCreating,
    requestAdd,
    searchValue,
    setSearchValue,
    requestSearch,
    requestSortAZ,
    resetSortAZ,
    resetSearch,
    isUpdating,
    editedText,
    setEditedText,
    currentEditingId,
    setCurrentEditingId,
    requestUpdate,
    isDeleting,
    requestDelete,
  };

  return (
    <TasksContext.Provider value={contextValue}>
      <div className={styles.container}>
        <div className={styles.blockList}>
          <h1 className={styles.title}>ToDoList</h1>
          <div className={styles.containerInput}>
            <input className={styles.input} type="text" value={isInput} onChange={(e) => { setIsInput(e.target.value) }} />
            <button className={styles.buttonAdd} disabled={isCreating} onClick={requestAdd}></button>
          </div>
          <div className={styles.searchContainer}>
            <button className={styles.buttonCancel} onClick={() => { resetSearch(), resetSortAZ() }}></button>
            <input className={styles.inputSearch} value={searchValue} type="search" onChange={(e) => { searchValue(e.target.value) }} />
            <button className={styles.buttonSearch} onClick={requestSearch}></button>
            <button className={styles.buttonSort} onClick={requestSortAZ}></button>
          </div>
          <div>
            {filteredList.map(({ id, title }) => (
              <div key={id} className={styles.containerListJSON}>
                {id === currentEditingId ? (
                  <>
                    <input className={styles.textList} type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} disabled={isUpdating} />
                    <button className={styles.buttonSave} onClick={() => requestUpdate(id)} disabled={isUpdating}></button>
                  </>
                ) : (
                  <>
                    <div className={styles.textList}>{title}</div>
                    <button className={styles.buttonUpdate} disabled={isLoading} onClick={() => setCurrentEditingId(id)}></button>
                    <button className={styles.buttonDelete} disabled={isDeleting} onClick={() => requestDelete(id)}></button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </TasksContext.Provider>
  );
}

export default Todos