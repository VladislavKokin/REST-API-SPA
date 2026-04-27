import { useEffect, useState } from 'react'
import styles from './toDoList.module.css'

const Todos = () => {
  const [isToDoList, setIsToDoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((loadedData) => loadedData.json())
      .then((loadedList) => {
        setIsToDoList(loadedList);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.blockList}>
        <h1 className={styles.title}>ToDoList</h1>
        <div className={styles.containerInput}>
          <input className={styles.input} type="text" />
          <button className={styles.buttonAdd}></button>
        </div>
        <div className={styles.searchContainer}>
          <input className={styles.inputSearch} type="text" />
          <button className={styles.buttonSearch}></button>
          <button className={styles.buttonSort}></button>
        </div>
        <div className={''}>
          {isToDoList.map(({ id, title }) => (
            <div key={id} className={styles.containerList}>
              <div className={styles.textList}>{title}</div>
              <button className={styles.buttonDelete}></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Todos