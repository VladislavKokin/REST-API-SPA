import { Link } from 'react-router-dom';
import styles from "../../toDoList.module.css"

const TaskList = ({ filteredList }) => {
  return (
    <div>
      {filteredList.map(({ id, title }) => (
        <Link to={`/todos/${id}`} key={id} className={styles.link}>
          <div className={styles.containerList}>
            <div className={styles.textList}>{title}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default TaskList