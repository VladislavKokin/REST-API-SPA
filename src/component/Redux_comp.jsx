import styles from '../../src/toDoList.module.css';
import { actions } from '../store/actions';
import {
    loadTodos,
    requestAdd,
    requestDelete,
    requestUpdate,
    requestSearch,
    requestSortAZ,
    resetRequest,
} from '../Hooks/index';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

export const Todos = () => {

    const dispatch = useDispatch();

    const [isInput, setIsInput] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [editedText, setEditedText] = useState('');

    const todos = useSelector((state) => state.todos);
    const isCreating = useSelector((state) => state.isCreating);
    const currentEditingId = useSelector((state) => state.currentEditingId);
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
                        onChange={(e) => setIsInput(e.target.value) } />
                    <button className={styles.buttonAdd} disabled={isCreating} onClick={() => { dispatch(requestAdd(isInput)); 
                        setIsInput('') }} />
                </div>
                <div className={styles.searchContainer}>
                    <button className={styles.buttonCancel} onClick={() => { dispatch(resetRequest()) }}  />
                    <input className={styles.inputSearch} value={searchValue} type="search"
                        onChange={ (e) => setSearchValue(e.target.value) } />
                    <button className={styles.buttonSearch} onClick={() => dispatch(requestSearch(searchValue))} />
                    <button className={styles.buttonSort} onClick={() => dispatch(requestSortAZ())} />
                </div>
                <div>
                    {todos.map(({ id, title }) => (
                        <div key={id} className={styles.containerListJSON}>
                            {id === currentEditingId ? (
                                <>
                                    <input className={styles.textList} type="text" value={editedText}
                                        onChange={ (e) => setEditedText(e.target.value)} disabled={isUpdating} />
                                    <button className={styles.buttonSave}
                                        onClick={() => dispatch(requestUpdate(id, editedText))} disabled={isUpdating} />
                                </>
                            ) : (
                                <>
                                    <div className={styles.textList}>{title}</div>
                                    <button className={styles.buttonUpdate}
                                        onClick={() => {
                                            dispatch(actions.setCurrentEditingId(id));
                                            setEditedText(title);
                                    }}/>
                                    <button className={styles.buttonDelete} disabled={isDeleting} onClick={() => dispatch(requestDelete(id))} />
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}