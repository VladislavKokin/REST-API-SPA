import styles from '../../toDoList.module.css';
import { actions } from '../Store/actions';
import { 
    loadTodos, 
    requestAdd, 
    requestDelete, 
    requestUpdate, 
    requestSearch,
    requestSortAZ,
    resetSearch,
    resetSortAZ
} from '../Hooks';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

export const Todos = () => {

    const dispatch = useDispatch();

    const isInput = useSelector((state) => state.isInput);
    const filteredList = useSelector((state) => state.filteredList);
    const isCreating = useSelector((state) => state.isCreating);
    const searchValue = useSelector((state) => state.searchValue);
    const currentEditingId = useSelector((state) => state.currentEditingId);
    const editedText = useSelector((state) => state.editedText);
    const isUpdating = useSelector((state) => state.isUpdating);
    const isDeleting = useSelector((state) => state.isDeleting);

    useEffect(() => {
        dispatch(loadTodos());
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <div className={styles.blockList}>
                <h1 className={styles.title}>ToDoList</h1>
                <div className={styles.containerInput}>
                    <input className={styles.input} type="text" value={isInput} 
                        onChange={ (e) => {dispatch(actions.setIsInput(e.target.value))} } />
                    <button className={styles.buttonAdd} disabled={isCreating} onClick={() => dispatch(requestAdd())}></button>
                </div>
                <div className={styles.searchContainer}>
                    <button className={styles.buttonCancel} onClick={() => { dispatch(resetSearch()); dispatch(resetSortAZ()); }}  ></button>
                    <input className={styles.inputSearch} value={searchValue} type="search"
                        onChange={ (e) => {dispatch(actions.setSearchValue(e.target.value))} } />
                    <button className={styles.buttonSearch} onClick={() => dispatch(requestSearch())}></button>
                    <button className={styles.buttonSort} onClick={() => dispatch(requestSortAZ())}></button>
                </div>
                <div>
                    {filteredList.map(({ id, title }) => (
                        <div key={id} className={styles.containerListJSON}>
                            {id === currentEditingId ? (
                                <>
                                    <input className={styles.textList} type="text" value={editedText} 
                                        onChange={ (e) => {dispatch(actions.setEditedText(e.target.value))}} disabled={isUpdating} />
                                    <button className={styles.buttonSave} onClick={() => dispatch(requestUpdate(id))} disabled={isUpdating}></button>
                                </>
                            ) : (
                                <>
                                    <div className={styles.textList}>{title}</div>
                                    <button className={styles.buttonUpdate} onClick={() => {
                                        dispatch(actions.setCurrentEditingId(id));
                                        dispatch(actions.setEditedText(title));
                                    }}></button>
                                    <button className={styles.buttonDelete} disabled={isDeleting} onClick={() => dispatch(requestDelete(id))}></button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}