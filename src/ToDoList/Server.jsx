import { useEffect, useState } from 'react'
import styles from './toDoList.module.css'

const Todos = () => {
  const [isInput, setIsInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [isToDoList, setIsToDoList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [refreshProducts, setRefreshProducts] = useState(false);;
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState(null);
  const [editedText, setEditedText] = useState(todos.title);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    setIsLoading(true);

    fetch("http://localhost:3000/todos")
      .then((loadedData) => loadedData.json())
      .then((loadedList) => {
        setIsToDoList(loadedList);
        setFilteredList(loadedList);
      })
      .finally(() => setIsLoading(false));
  }, [refreshProducts]);
  
  const handleChange = (e) => {
    setIsInput(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const requestSearch = () => {
    const result = isToDoList.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );

    setFilteredList(result);
  };

  const resetSearch = () => {
    setSearchValue("");
    setFilteredList(isToDoList);
  };

  const requestSortAZ = () => {
    const sorted = [...filteredList].sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    setFilteredList(sorted);
  };

  const resetSortAZ= () => {
    setFilteredList(isToDoList)
  }

  const requestAdd = () => {
    setIsCreating(true);

    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: isInput,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("Ответ сервера:", response);
        setTodos((prevTodos) => [response, ...prevTodos]);
        setRefreshProducts(!refreshProducts);
      })
      .finally(() => {
        (setIsCreating(false), setIsInput(""));
      });
  };

  const requestUpdate = (todoID) => {
    setIsUpdating(true);

    fetch(`http://localhost:3000/todos/${todoID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: editedText,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("Задача обновлена:", response);
        setRefreshProducts(!refreshProducts);
      })
      .finally(() => {
        (setIsUpdating(false), setEditedText(''), setCurrentEditingId(null));
      });
  };

  const reqestDelete = (todoID) => {
    setIsDeleting(true);

    fetch(`http://localhost:3000/todos/${todoID}`, {
            method: 'DELETE',
        })
            .then((rawResponse) => rawResponse.json())
            .then((response) => {
                console.log('Ответ сервера: ', response);
                setTodos(todos.filter(item => item.id !== todoID))
                setRefreshProducts(!refreshProducts);
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
          {filteredList.map(({ id, title }) => (
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