import { useEffect, useState } from 'react'
import styles from './toDoList.module.css'
import { ref, onValue, push, set, remove } from 'firebase/database';
import { db } from '../firebase'

const Todos = () => {
  const [isInput, setIsInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [isToDoList, setIsToDoList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState(null);
  const [editedText, setEditedText] = useState(todos.title);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const listDbRef = ref(db, 'todos')

    return onValue(listDbRef, (snapshot) => {
        const loadedList = snapshot.val() || [];

        setIsToDoList(loadedList);
        setFilteredList(loadedList);
    })}, []);
  
  const handleChange = (e) => {
    setIsInput(e.target.value);
  };

  const requestAdd = () => {
    setIsCreating(true);

    const listDbRef = ref(db, 'todos');

    push(listDbRef, {
        title: isInput
    })
      .then((response) => {
        console.log("Ответ сервера:", response);
        setTodos((prevTodos) => [response, ...prevTodos]);
      })
      .finally(() => {
        (setIsCreating(false), setIsInput(""));
      });
  };

  const requestUpdate = (todoID) => {
    setIsUpdating(true);

    const listDbRef = ref(db, `todos/${todoID}`);

    set(listDbRef, {
        title: editedText
    }) 
      .then((response) => {
        console.log("Задача обновлена:", response);
      })
      .finally(() => {
        (setIsUpdating(false), setEditedText(''), setCurrentEditingId(null));
      });
  };

  const reqestDelete = (todoID) => {
    setIsDeleting(true);

    const listDbRef = ref(db, `todos/${todoID}`);

    remove(listDbRef)
        .then((response) => {
            console.log('Ответ сервера: ', response);
            setTodos(todos.filter(item => item.id !== todoID))
        })
        .finally(() => setIsDeleting(false));
  };

  return (
    <div className={styles.container}>
      <div className={styles.blockList}>
        <h1 className={styles.title}>ToDoList</h1>
        <div className={styles.containerInput}>
          <input className={styles.input} type="text" value={isInput} onChange={handleChange}/>
          <button className={styles.buttonAdd} disabled={isCreating} onClick={requestAdd}></button>
        </div>
        <div className={styles.searchContainer}>
          <button className={styles.buttonCancel} onClick={() => { resetSearch, resetSortAZ }}></button>
          <input className={styles.inputSearch} value={searchValue} type="search" onChange={handleSearch}/>
          <button className={styles.buttonSearch} onClick={requestSearch}></button>
          <button className={styles.buttonSort} onClick={requestSortAZ}></button>
        </div>
        <div>
          {Object.entries(filteredList).map(([ id, { title }]) => (
            <div key={id} className={styles.containerList}>
              {id === currentEditingId ? (
                <>
                  <input className={styles.textList} type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} disabled={isUpdating} />
                  <button className={styles.buttonSave} onClick={() => requestUpdate(id)} disabled={isUpdating}></button>
                </>
              ) : (
                <>
                  <div className={styles.textList}>{title}</div>
                  <button className={styles.buttonUpdate} onClick={() => setCurrentEditingId(id)}></button>
                  <button className={styles.buttonDelete} disabled={isDeleting} onClick={() => reqestDelete(id)}></button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Todos