import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>404 - Страница не найдена</h1>
      <p>Запрошенный адрес не существует.</p>
      <button onClick={() => navigate('/')}>К задачам</button>
    </div>
  )
}

export default NotFound