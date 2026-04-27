import { useState, useEffect } from 'react'
import styles from "../toDoList.module.css";
import { Routes, Route, Link } from 'react-router-dom'
import TaskList from "./components/TaskList";
import NotFound from "./components/NotFound";
import SingleTask from './components/SingleTask';
import {
  useRequestAdd,
  useResetSortAZ,
  useResetSearch,
  useRequestSortAZ,
  useRequestSearch,
} from "./Hooks";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [isToDoList, setIsToDoList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('')
  const [refreshProductsFlag, setRefreshProductsFlag] = useState(false)

  useEffect(() => {
      setIsLoading(true);
  
      fetch("http://localhost:3000/todos")
        .then((loadedData) => loadedData.json())
        .then((loadedList) => {
          setIsToDoList(loadedList);
          setFilteredList(loadedList);
        })
        .finally(() => setIsLoading(false));
    }, [refreshProductsFlag]);

  const { isCreating, isInput, setIsInput, requestAdd } = useRequestAdd(setTodos, setRefreshProductsFlag)
  const { requestSearch } = useRequestSearch(isToDoList, setFilteredList);
  const { requestSortAZ } = useRequestSortAZ(filteredList, setFilteredList);
  const { resetSortAZ } = useResetSortAZ(isToDoList, setFilteredList);
  const { resetSearch } = useResetSearch(isToDoList, setSearchValue, setFilteredList);
  

  return (
    <div className={styles.container}>
      <div className={styles.blockList}>
        <h1 className={styles.title}>ToDoList</h1>
        <div className={styles.containerInput}>
          <input className={styles.input} type="text" value={isInput} onChange={ (e) => { setIsInput(e.target.value) }}/>
          <button className={styles.buttonAdd} disabled={isCreating} onClick={requestAdd}></button>
        </div>
        <div className={styles.searchContainer}>
          <button className={styles.buttonCancel} onClick={() => { resetSearch(), resetSortAZ() }}></button>
          <input className={styles.inputSearch} value={searchValue} type="search" onChange={ (e) => { setSearchValue(e.target.value) }} />
          <button className={styles.buttonSearch} onClick={requestSearch}></button>
          <button className={styles.buttonSort} onClick={requestSortAZ}></button>
        </div>
        <Routes>
          <Route path="/" element={<TaskList
            isToDoList={isToDoList}
            filteredList={filteredList} />} />
          <Route path="/todos/:id" element={<SingleTask setRefreshProductsFlag={setRefreshProductsFlag}/>} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </div>
  );
}

export default Todos