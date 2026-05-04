import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from "../../toDoList.module.css";
import { useRequestDelete, useRequestUpdate } from "../Hooks";

  const SingleTask = ({setRefreshProductsFlag}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch(`http://localhost:3000/todos/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Задача не найдена");
        return response.json();
      })
      .then((data) => {
        setTask(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        navigate("/404", { replace: true });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, navigate]);

  const {
    isDeleting,  
    requestDelete
    } = useRequestDelete(setRefreshProductsFlag);
    
  const { 
    isUpdating,
    editedText,
    setEditedText,
    currentEditingId,
    setCurrentEditingId,
    requestUpdate } = useRequestUpdate(setRefreshProductsFlag);

  if (loading) return <p>Загрузка...</p>;
  if (error || !task) return <p>Задача не найдена</p>;

    return (
      <div className={styles.containerListActive}>
        {id === currentEditingId ? (
          <>
            <button className={styles.buttonBack} onClick={() => navigate('/')}></button>
            <input
              className={styles.textListActive}
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              disabled={isUpdating}
            />
            <button
              className={styles.buttonSave}
              onClick={() => { requestUpdate(id), navigate('/') }}
              disabled={isUpdating}
            />
          </>
        ) : (
          <>
            <button className={styles.buttonBack} onClick={() => navigate('/')}></button>
            <div className={styles.textListActive}>{task.title}</div>
            <button
              className={styles.buttonUpdate}
              disabled={loading}
              onClick={() => setCurrentEditingId(id)}
            />
            <button
              className={styles.buttonDelete}
              disabled={isDeleting}
              onClick={() => { requestDelete(id), navigate('/') }}
            />
          </>
        )}
      </div>
    );
  };

export default SingleTask;